import { NextResponse } from "next/server";
import { GetMoreDetail } from '@/app/utils/website/getDetail'; // Import the GetMoreDetail function

export const GET = async (req: Request) => {
    try {
        const moreDetails = await GetMoreDetail(); // Call GetMoreDetail function to get more details
        console.log('More Details:', moreDetails); // Log the result

        if (!moreDetails) {
            return NextResponse.json(
                { message: "More details not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(moreDetails);
    } catch (err) {
        console.error('Error:', err); // Log any errors
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
};
