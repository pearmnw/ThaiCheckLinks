import { db } from "@/lib/db";
import { URL } from 'url';

interface WebsiteGroup {
    [key: string]: {
        Protocol: string;
        Subdomain: string;
        SDL: string;
        TLD: string;
        MaxCategoryID: number; // Updated to track max category reported
        _count: {
            WebsiteID: number;
        };
        latestReportDate: Date | null;
    };
}

interface FormattedWebsite {
    id: number;
    WebsiteURL: string;
    WebCategoryID: number;
    WebCategoryName: string;
    reports: number;
    reporttime: Date | null;
}

export const GetWebsiteGroup = async (): Promise<FormattedWebsite[]> => {
    const websiteDetails = await db.websiteDetail.findMany();

    const websiteGroups: WebsiteGroup = websiteDetails.reduce((groups: WebsiteGroup, website) => {
        const parsedUrl = new URL(website.WebsiteURL);
        const websiteURL = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

        if (!groups[websiteURL]) {
            groups[websiteURL] = {
                Protocol: parsedUrl.protocol,
                Subdomain: parsedUrl.hostname.split('.')[0], // Extract subdomain if present
                SDL: parsedUrl.hostname.split('.')[1], // Extract SDL part
                TLD: parsedUrl.hostname.split('.').slice(2).join('.'), // Extract TLD
                MaxCategoryID: website.WebCategoryID,
                _count: {
                    WebsiteID: 0
                },
                latestReportDate: null
            };
        }

        groups[websiteURL]._count.WebsiteID++;

        if (website.WebCategoryID > groups[websiteURL].MaxCategoryID) {
            groups[websiteURL].MaxCategoryID = website.WebCategoryID;
        }

        if (!groups[websiteURL].latestReportDate || website.WebsiteReportedDate > groups[websiteURL].latestReportDate!) {
            groups[websiteURL].latestReportDate = website.WebsiteReportedDate;
        }

        return groups;
    }, {});

    const formattedWebsites: FormattedWebsite[] = Object.values(websiteGroups).map((websiteGroup, index) => {
        const { Protocol, Subdomain, SDL, TLD, MaxCategoryID, _count, latestReportDate } = websiteGroup;

        // Construct the website URL based on the presence of subdomain and TLD
        let websiteURL = `${Protocol}//${Subdomain ? Subdomain + '.' : ''}${SDL}`;
        if (TLD) {
            websiteURL += `.${TLD}`;
        }

        return {
            id: index + 1,
            WebsiteURL: websiteURL,
            WebCategoryID: MaxCategoryID, // Assign MaxCategoryID
            WebCategoryName: "Unknown", // Default value if category not found
            reports: _count.WebsiteID,
            reporttime: latestReportDate
        };
    });

    // Sort formattedWebsites by the number of reports in descending order
    formattedWebsites.sort((a, b) => b.reports - a.reports);

    // Fetch and assign the WebCategoryName for each website
    await Promise.all(formattedWebsites.map(async (website) => {
        const category = await db.websiteCategory.findUnique({
            where: {
                WebCategoryID: website.WebCategoryID
            },
            select: {
                WebCategoryName: true
            }
        });

        if (category) {
            website.WebCategoryName = category.WebCategoryName;
        }
    }));

    return formattedWebsites;
};
