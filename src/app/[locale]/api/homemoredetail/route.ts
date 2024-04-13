
import { NextResponse } from "next/server";
import { GetMoreDetail } from '@/app/utils/website/getDetail'; // Import the GetMoreDetail function

export const GET = async (req: any) => {
    
    try {
        // Call GetMoreDetail function to get more details
        const moreDetails = await GetMoreDetail();


        if (!moreDetails) {
            return NextResponse.json(
                { message: "More details not found" },
                { status: 404 }
            );
        }

        // Extract query parameters
        const urlList = req.url?.split('=') as string[];
        const websiteURL = urlList[1];
       
        if (websiteURL) {
            const decodedWebsiteURL = decodeURIComponent(websiteURL);
            const filteredDetails = moreDetails.filter(detail => detail.WebsiteURL === decodedWebsiteURL);
            console.log(true)
            return NextResponse.json(filteredDetails);
        }
        else{
            // If WebsiteURL is not provided, return all details
            return NextResponse.json(moreDetails);
        }

    } catch (err) {
        console.error('Error:', err); // Log any errors
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
};
