// import express, { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client/edge';

// const prisma = new PrismaClient();
// const app = express();

// app.get('/websites', async (req, res) => {
//     try {
//         // Fetch websites grouped by URL and category, and count the number of unique WebsiteIDs for each group
//         const websiteGroups = await prisma.websiteDetail.groupBy({
//             by: ['WebsiteURL', 'WebCategoryID'], 
//             _count: {
//                 WebsiteID: true // Count unique WebsiteIDs for each group
//             },
//             orderBy: {
//                 _count: {
//                     WebsiteID: 'desc' // Order by the number of reports in descending order
//                 }
//             }
//         });

//         // Map over grouped websites to extract necessary data and calculate the number of unique reports for each URL
//         let sequentialId = 1;
//         const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup: any) => {
//             // Extract unique values for WebsiteURL and WebCategoryID
//             const WebsiteURL = websiteGroup.WebsiteURL[0];
//             const WebCategoryID = websiteGroup.WebCategoryID[0];

//             // Fetch the WebCategoryName corresponding to the WebCategoryID
//             const category = await prisma.websiteCategory.findUnique({
//                 where: {
//                     WebCategoryID
//                 },
//                 select: {
//                     WebCategoryName: true
//                 }
//             });

//             // Count the number of unique reports (number of unique WebsiteIDs) for each URL
//             const numReports = websiteGroup._count.length;

//             const formattedWebsite = {
//                 id: sequentialId++, // Increment sequential ID
//                 WebsiteURL,
//                 WebCategoryName: category?.WebCategoryName ?? "Unknown", // Use "Unknown" if category is not found
//                 reports: numReports
//             };

//             return formattedWebsite;
//         }));

//         res.json(formattedWebsites);
//     } catch (error) {
//         console.error('Error fetching websites:', error);
//         res.status(500).json({ error: 'An error occurred while fetching websites' });
//     }
// });


// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// server.js ========================================== 2 
// import express from 'express';
// import { PrismaClient } from '@prisma/client/edge';

// const prisma = new PrismaClient();
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/websites', async (req, res) => {
//     try {
//         const websiteGroups = await prisma.websiteDetail.groupBy({
//             by: ['WebsiteURL', 'WebCategoryID'],
//             _count: {
//                 WebsiteID: true
//             },
//             orderBy: {
//                 _count: {
//                     WebsiteID: 'desc'
//                 }
//             }
//         });

//             let sequentialId = 1;
//             const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup) => {
//             const WebsiteURL = websiteGroup.WebsiteURL[0];
//             const WebCategoryID: number = websiteGroup.WebCategoryID;
//             const category = await prisma.websiteCategory.findUnique({
//                 where: {
//                     WebCategoryID
//                 },
//                 select: {
//                     WebCategoryName: true
//                 }
//             });
//             // const numReports = websiteGroup._count.length;
//             // Check if _count is an array before accessing its length
//             const numReports = Array.isArray(websiteGroup._count) ? websiteGroup._count.length : 0;
//             const formattedWebsite = {
//                 id: sequentialId++,
//                 WebsiteURL,
//                 WebCategoryName: category?.WebCategoryName ?? "Unknown",
//                 reports: numReports
//             };
//             return formattedWebsite;
//         }));

//         res.json(formattedWebsites);

//     } catch (error) {
//         console.error('Error fetching websites:', error);
//         res.status(500).json({ error: 'An error occurred while fetching websites' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client/edge';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         try {
//             const websiteGroups = await prisma.websiteDetail.groupBy({
//                 by: ['WebsiteURL', 'WebCategoryID'],
//                 _count: {
//                     WebsiteID: true
//                 },
//                 orderBy: {
//                     _count: {
//                         WebsiteID: 'desc'
//                     }
//                 }
//             });


//==================================
//             let sequentialId = 1;
//             const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup) => {
//                 const WebsiteURL = websiteGroup.WebsiteURL[0];
//                 const WebCategoryID: number = websiteGroup.WebCategoryID;
//                 const category = await prisma.websiteCategory.findUnique({
//                     where: {
//                         WebCategoryID
//                     },
//                     select: {
//                         WebCategoryName: true
//                     }
//                 });
//                 const numReports = Array.isArray(websiteGroup._count) ? websiteGroup._count.length : 0;
//                 const formattedWebsite = {
//                     id: sequentialId++,
//                     WebsiteURL,
//                     WebCategoryName: category?.WebCategoryName ?? "Unknown",
//                     reports: numReports
//                 };
//                 return formattedWebsite;
//             }));

//             res.json(formattedWebsites);

//         } catch (error) {
//             console.error('Error fetching websites:', error);
//             res.status(500).json({ error: 'An error occurred while fetching websites' });
//         }
//     } else {
//         res.status(405).json({ error: 'Method Not Allowed' });
//     }
// }


//=====================================

// import { GetWebsiteGroup } from '@/app/utils/website/getWebsite';
// import { PrismaClient } from '@prisma/client/edge';
// import express from 'express';

// const prisma = new PrismaClient();
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.get('/websites', async (req, res) => {
//     try {
//         // Query definition starts here
//         const websiteGroups = await prisma.websiteDetail.groupBy({
//             by: ['WebsiteURL', 'WebCategoryID'],
//             _count: {
//                 WebsiteID: true
//             },
//             orderBy: {
//                 _count: {
//                     WebsiteID: 'desc'
//                 }
//             }
//         });

//         // const websiteGroups = await GetWebsiteGroup();
//         // Query definition ends here

//         let sequentialId = 1;
//         const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup) => {
//             const WebsiteURL = websiteGroup.WebsiteURL[0];
//             const WebCategoryID: number = websiteGroup.WebCategoryID;

//             const category = await prisma.websiteCategory.findUnique({
//                 where: {
//                     WebCategoryID
//                 },
//                 select: {
//                     WebCategoryName: true
//                 }
//             });

//             const numReports = Array.isArray(websiteGroup._count) ? websiteGroup._count.length : 0;

//             const formattedWebsite = {
//                 id: sequentialId++,
//                 WebsiteURL,
//                 WebCategoryName: category?.WebCategoryName ?? "Unknown",
//                 reports: numReports
//             };

//             return formattedWebsite;
//         }));

//         res.json(formattedWebsites);

//     } catch (error) {
//         console.error('Error fetching websites:', error);
//         res.status(500).json({ error: 'An error occurred while fetching websites' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// ===================
 
// import { db } from "@/lib/db";

// export const getFormattedWebsites = async () => {
//     const websiteGroups = await db.websiteDetail.groupBy({
//         by: ['WebsiteURL', 'WebCategoryID'],
//         _count: {
//             WebsiteID: true
//         },
//         orderBy: {
//             _count: {
//                 WebsiteID: 'desc'
//             }
//         }
//     });

//     let sequentialId = 1;
//     const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup) => {
//         const WebsiteURL = websiteGroup.WebsiteURL[0];
//         const WebCategoryID: number = websiteGroup.WebCategoryID;

//         const category = await db.websiteCategory.findUnique({
//             where: {
//                 WebCategoryID
//             },
//             select: {
//                 WebCategoryName: true
//             }
//         });

//         const numReports = Array.isArray(websiteGroup._count) ? websiteGroup._count.length : 0;

//         return {
//             id: sequentialId++,
//             WebsiteURL,
//             WebCategoryName: category?.WebCategoryName ?? "Unknown",
//             reports: numReports
//         };
//     }));

//     return formattedWebsites;
// };

// ===================

import { NextResponse } from "next/server";
import { GetWebsiteGroup } from '@/app/utils/website/getWebsite';

export const GET = async (req: Request) => {
    try {
        const websiteGroups = await GetWebsiteGroup();
        console.log('Website Groups:', websiteGroups); // Log the result

        if (!websiteGroups) {
            return NextResponse.json(
                { message: "Website groups not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(websiteGroups);
    } catch (err) {
        console.error('Error:', err); // Log any errors
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
};
