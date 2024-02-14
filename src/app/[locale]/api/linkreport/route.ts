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

import { db } from "@/lib/db";
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
        const { UserID, WebsiteURL, WebsiteCategory, BankID, BankAccountOwner, BankNumber_, WebsiteReportedDetails } = body;
        const WebsiteStatus = true;
        let WebCategoryID;
        switch (WebsiteCategory) {
            case "default":
                return NextResponse.json({ WebsiteDetail: null, message: "Please provide the category of the website" }, { status: 409 });
            case "gambling":
                WebCategoryID = 1;
                break;
            case "scam":
                WebCategoryID = 2;
                break;
            case "fake":
                WebCategoryID = 3;
                break;
            case "others":
                WebCategoryID = 0;
                break;
            default:
                return NextResponse.json({ WebsiteDetail: null, message: "Please provide the category of the website" }, { status: 409 });
        }

        // เราต้องทำอะไรบ้างในการจะเก็บ report 1 ครั้ง
        // - SetCategoryID
        // - เช็ค URL with table WebsiteMeta (ต้องจัดformatURLที่ User ใส่เข้ามาด้วย)
        // - ถ้ามีก็ไม่ต้อง Create WebsiteMeta
        //   - แต่ check current percent กับ max percent แล้วเก็บเข้า Verification
        // - ถ้าไม่มีต้องเก็บเข้าเว็บไซต์ Meta ด้วย
        const newReport = await db.websiteDetail.create({
            data: {
                UserID,
                WebCategoryID,
                WebsiteURL,
                BankID,
                BankAccountOwner,
                BankNumber_,
                WebsiteReportedDetails,
            }
        });

        return NextResponse.json({ websiteDetail: newReport, message: "Report created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}