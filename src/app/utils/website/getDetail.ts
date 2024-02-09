// import { db } from "@/lib/db";
// import { URL } from 'url';

// interface WebsiteGroup {
//     [key: string]: {
//         UserID: number[];
//         WebCategoryIDs: number[];
//         latestReportDate: Date | null;
//         BankID: string | null; // Ensure BankID is string
//         BankAccountOwner: string;
//         BankNumber: string;
//     };
// }

// interface FormattedWebsite {
//     id: number;
//     WebsiteURL: string;
//     WebCategoryID: number;
//     WebCategoryName: string;
//     reporttime: Date | null;
//     BankID: string; // Ensure BankID is string
//     BankName: string;
//     BankAccountOwner: string;
//     BankNumber: string;
// }

// export const GetMoreDetail = async (): Promise<FormattedWebsite[]> => {
//     const websiteDetails = await db.websiteDetail.findMany();

//     const websiteGroups: WebsiteGroup = websiteDetails.reduce((groups: WebsiteGroup, website) => {
//         const parsedUrl = new URL(website.WebsiteURL);
//         const { protocol, hostname } = parsedUrl;
//         const key = `${protocol}//${hostname}`;

//         if (!groups[key]) {
//             groups[key] = {
//                 UserID: [],
//                 WebCategoryIDs: [],
//                 latestReportDate: null,
//                 BankID: null,
//                 BankAccountOwner: "-",
//                 BankNumber: "-"
//             };
//         }

//         groups[key].UserID.push(website.UserID);
//         groups[key].WebCategoryIDs.push(website.WebCategoryID);

//         // Update latestReportDate if the current report is more recent
//         if (!groups[key].latestReportDate || website.WebsiteReportedDate > groups[key].latestReportDate!) {
//             groups[key].latestReportDate = website.WebsiteReportedDate;
//         }

//         // Update Bank information if BankID exists
//         if (website.BankID) {
//             groups[key].BankID = String(website.BankID); // Convert BankID to string
//             groups[key].BankAccountOwner = website.BankAccountOwner || "-";
//             groups[key].BankNumber = website.BankNumber_ || "-";
//         }

//         return groups;
//     }, {});

//     const formattedWebsites: FormattedWebsite[] = Object.values(websiteGroups).map((websiteGroup, index) => {
//         const { WebCategoryIDs, latestReportDate, BankID, BankAccountOwner, BankNumber } = websiteGroup;

//         return {
//             id: index + 1,
//             WebsiteURL: Object.keys(websiteGroups)[index], // Extract URL from the key
//             WebCategoryID: WebCategoryIDs[0], // Assign the first WebCategoryID
//             WebCategoryName: "Unknown", // Default value for WebCategoryName
//             reporttime: latestReportDate,
//             BankID: BankID || "", // Default value for BankID
//             BankName: "-", // Default value for BankName
//             BankAccountOwner,
//             BankNumber
//         };
//     });

//     // Fetch WebCategoryNames and BankNames based on WebCategoryIDs and BankIDs
//     await Promise.all(formattedWebsites.map(async (website) => {
//         if (website.WebCategoryID !== null && website.WebCategoryID !== -1) {
//             const category = await db.websiteCategory.findUnique({
//                 where: {
//                     WebCategoryID: website.WebCategoryID
//                 },
//                 select: {
//                     WebCategoryName: true
//                 }
//             });

//             if (category) {
//                 website.WebCategoryName = category.WebCategoryName;
//             }
//         }

//         if (website.BankID !== null && website.BankID !== "-1") {
//             const bank = await db.bank.findUnique({
//                 where: {
//                     BankID: website.BankID // Ensure BankID is always treated as a string
//                 },
//                 select: {
//                     BankName: true
//                 }
//             });

//             if (bank) {
//                 website.BankName = bank?.BankName ?? "-";
//             }
//         }
//     }));

//     return formattedWebsites;
// };

import { db } from "@/lib/db";
import { URL } from 'url';

interface WebsiteReport {
    UserName: string;
    WebsiteURL: string;
    WebCategoryID: number;
    WebCategoryName: string;
    reporttime: Date | null;
    BankID: string | null;
    BankName: string;
    BankAccountOwner: string;
    BankNumber: string | null;
    WebsiteReportedDetails: string | null;
}

export const GetMoreDetail = async (): Promise<WebsiteReport[]> => {
    // Fetch website details from the database including UserName
    const websiteDetails = await db.websiteDetail.findMany({
        include: {
            UserDetail: {
                select: {
                    UserName: true
                }
            }
        }
    });

    // Initialize an empty array to store formatted reports
    const formattedReports: WebsiteReport[] = [];

    // Iterate through each website detail
    for (const website of websiteDetails) {
        const parsedUrl = new URL(website.WebsiteURL);
        const { protocol, hostname } = parsedUrl;
        const websiteURL = `${protocol}//${hostname}`;

        // Format the report
        const formattedReport: WebsiteReport = {
            UserName: website.UserDetail.UserName, // Include the username
            WebsiteURL: websiteURL,
            WebCategoryID: website.WebCategoryID,
            WebCategoryName: "Unknown", // Default value for WebCategoryName
            reporttime: website.WebsiteReportedDate,
            BankID: website.BankID || null, // Include BankID
            BankName: "-", // Default value for BankName
            BankAccountOwner: website.BankAccountOwner || "-", // Default value for BankAccountOwner
            BankNumber: website.BankNumber_ || "-",
            WebsiteReportedDetails: website.WebsiteReportedDetails || null // Include WebsiteReportedDetails 
        };

        // Fetch additional details for the report (e.g., WebCategoryName, BankName)
        if (website.WebCategoryID !== null && website.WebCategoryID !== -1) {
            const category = await db.websiteCategory.findUnique({
                where: {
                    WebCategoryID: website.WebCategoryID
                },
                select: {
                    WebCategoryName: true
                }
            });

            if (category) {
                formattedReport.WebCategoryName = category.WebCategoryName;
            }
        }

        if (website.BankID !== null && website.BankID !== "-1") {
            const bank = await db.bank.findUnique({
                where: {
                    BankID: website.BankID
                },
                select: {
                    BankName: true
                }
            });

            if (bank) {
                formattedReport.BankName = bank?.BankName ?? "-";
            }
        }

        // Add the formatted report to the array
        formattedReports.push(formattedReport);
    }

    // Sort the formatted reports by the report time (in descending order)
    formattedReports.sort((a, b) => (b.reporttime?.getTime() || 0) - (a.reporttime?.getTime() || 0));

    return formattedReports; // Return the sorted and formatted reports
};
