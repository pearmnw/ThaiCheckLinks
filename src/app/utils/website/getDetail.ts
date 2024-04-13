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
    PhoneNumber: string | null;
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
            BankAccountOwner: website.BankAccountOwner || "", // Default value for BankAccountOwner
            BankNumber: website.BankNumber || "",
            WebsiteReportedDetails: website.WebsiteReportedDetails || null, // Include WebsiteReportedDetails 
            PhoneNumber: website.PhoneNumber || "-",
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

