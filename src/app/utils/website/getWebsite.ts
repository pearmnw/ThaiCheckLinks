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
}

