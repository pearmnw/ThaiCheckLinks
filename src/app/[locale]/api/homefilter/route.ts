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
