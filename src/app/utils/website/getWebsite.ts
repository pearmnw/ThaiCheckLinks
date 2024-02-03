// import { db } from "@/lib/db";

// export const GetWebsiteGroup = async () => {
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
// }

import { db } from "@/lib/db";

export const GetWebsiteGroup = async () => {
    const websiteGroups = await db.websiteDetail.groupBy({
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

    let sequentialId = 1;
    const formattedWebsites = await Promise.all(websiteGroups.map(async (websiteGroup) => {
        const WebsiteURL = websiteGroup.WebsiteURL;
        const WebCategoryID: number = websiteGroup.WebCategoryID;

        const category = await db.websiteCategory.findUnique({
            where: {
                WebCategoryID
            },
            select: {
                WebCategoryName: true
            }
        });

        // const latestReport = await db.websiteDetail.aggregate({
        //     where: {
        //         WebsiteURL
        //     },
        //     orderBy: {
        //         WebsiteReportedDate: 'desc' // Order by the report time in descending order to get the latest report
        //     },
        //     _max: {
        //         WebsiteReportedDate: true
        //     }
        // });

        const latestReport = await db.websiteDetail.findFirst({
            where: {
                WebsiteURL
            },
            orderBy: {
                WebsiteReportedDate: 'desc' // Order by the report time in descending order to get the latest report
            }
        });

        let numReports = websiteGroup._count.WebsiteID;

        return {
            id: sequentialId++,
            WebsiteURL,
            WebCategoryName: category?.WebCategoryName ?? "Unknown",
            reports: numReports,
            reporttime: latestReport ? latestReport.WebsiteReportedDate : null
        };
    }));

    return formattedWebsites;
};
