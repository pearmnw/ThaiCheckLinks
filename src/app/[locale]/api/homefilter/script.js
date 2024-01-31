import express from 'express';
import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/websites', async (req, res) => {
    try {
        console.log('Fetching websites...');
        
        const websiteGroups = await prisma.websiteDetail.groupBy({
            by: ['WebsiteURL', 'WebCategoryID'],
            _count: {
                WebsiteID: true
            },
            orderBy: {
                _count: {
                    WebsiteID: 'desc'
                }
            }
        });
        
        console.log('Website groups:', websiteGroups);

        let sequentialId = 1;
        const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup) => {
            const WebsiteURL = websiteGroup.WebsiteURL[0];
            const WebCategoryID = websiteGroup.WebCategoryID; // Remove type annotation

            console.log('Processing website group:', WebsiteURL, WebCategoryID);

            const category = await prisma.websiteCategory.findUnique({
                where: {
                    WebCategoryID
                },
                select: {
                    WebCategoryName: true
                }
            });

            console.log('Category:', category);

            const numReports = Array.isArray(websiteGroup._count) ? websiteGroup._count.length : 0;
            console.log('Number of reports:', numReports);

            const formattedWebsite = {
                id: sequentialId++,
                WebsiteURL,
                WebCategoryName: category?.WebCategoryName ?? "Unknown",
                reports: numReports
            };

            console.log('Formatted website:', formattedWebsite);

            return formattedWebsite;
        }));

        console.log('Sending response:', formattedWebsites);
        res.json(formattedWebsites);
        
    } catch (error) {
        console.error('Error fetching websites:', error);
        res.status(500).json({ error: 'An error occurred while fetching websites' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
