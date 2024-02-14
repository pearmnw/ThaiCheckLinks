//     Model WebsiteDetails
//     UserID              Int                @default(autoincrement())
//     WebCategoryID       Int                @default(autoincrement())
//     WebsiteURL          String
//     BankID              String?            @db.VarChar(128)
//     BankAccountOwner    String?            @db.VarChar(128)
//     BankNumber_         String?            @map("BankNumber ") @db.VarChar(50)
//     WebsiteReportedDetails      String

//   Model WebsiteMeta
//   WebCategoryID      Int             @default(autoincrement())
//   WebsiteURL         String?
//   WebsiteMetaTitle   String?
//   WebsiteMetaDesc    String?
//   WebsiteMetaKeyword String?
//   WebsiteText        String?
//   WebsiteStatus      Boolean?

import { getWebsiteMetaByURL, setCategoryID, setURL } from "@/app/utils/report/getReportFunc";
import { getVerificationByMetaWebsiteID } from "@/app/utils/verification/getVerificationFunc";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        const session = getServerSession(authOptions);
        const currUserSession = JSON.stringify(session);
        console.log(currUserSession);
        const { UserID, WebsiteURL, WebsiteCategory, BankID, BankAccountOwner, BankNumber, WebsiteReportedDetails, MetaWebsite, VerificationInfo } = body
        // TODO: SetCategoryID
        const webcatID = await setCategoryID(WebsiteCategory);
        // console.log("userID: ", UserID);
        // console.log("webcatID: ", webcatID);
        // console.log("reportDetails: ", WebsiteReportedDetails)
        // console.log("Meta: ", MetaWebsite);
        // console.log("Percent: ", CurrentPercent);
        // TODO: Call setURL Function to Clean the URL to match the existing URL in WebsiteMeta
        const URL = await setURL(WebsiteURL);
        // TODO: Call getWebsiteMetaByURL function to check existing url in WebsiteMeta
        const websiteMetaArray = await getWebsiteMetaByURL(URL);
        let websiteMeta;
        let webVerification;
        // Result is an array, actually each link must be unique!!
        if (websiteMetaArray.length > 0) {
            // So we can access just the first element
            websiteMeta = websiteMetaArray[0];
            // getMetaWebsiteID
            console.log(websiteMeta.MetaWebsiteID);
            webVerification = await getVerificationByMetaWebsiteID(websiteMeta.MetaWebsiteID, VerificationInfo);
            console.log(webVerification);
        } else {
            console.log('No website meta found.');
        }
        // console.log(websiteMeta)
        // const { UserID, WebsiteURL, WebsiteCategory, BankID, BankAccountOwner, BankNumber_, WebsiteReportedDetails } = body;
        // const WebsiteStatus = true;

        // เราต้องทำอะไรบ้างในการจะเก็บ report 1 ครั้ง
        // - เช็ค URL with table WebsiteMeta (ต้องจัดformatURLที่ User ใส่เข้ามาด้วย)
        // - ถ้ามีก็ไม่ต้อง Create WebsiteMeta
        //   - แต่ check current percent กับ max percent แล้วเก็บเข้า Verification
        // - ถ้าไม่มีต้องเก็บเข้าเว็บไซต์ Meta ด้วย
        // const newReport = await db.websiteDetail.create({
        //     data: {
        //         UserID,
        //         WebCategoryID,
        //         WebsiteURL,
        //         BankID,
        //         BankAccountOwner,
        //         BankNumber_,
        //         WebsiteReportedDetails,
        //     }
        // });
        return NextResponse.json({ websiteMeta: websiteMetaArray, message: "Find Meta Here" }, { status: 201 });
        // return NextResponse.json({ websiteDetail: newReport, message: "Report created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}