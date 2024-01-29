// model WebsiteDetail {
//     WebsiteID           Int                @id @default(autoincrement())
//     UserID              Int                @default(autoincrement())
//     WebCategoryID       Int                @default(autoincrement())
//     WebsiteURL          String
//     WebsiteMetaTitle    String?
//     WebsiteMetaDesc     String?
//     WebsiteMetaKeyword  String?
//     WebsiteText         String?
//     WebsiteStatus       Boolean
//     WebsiteReportedDate DateTime           @default(now()) @db.Timestamptz(6)
//     BankAccountName     String?            @db.VarChar(128)
//     BankAccountOwner    String?            @db.VarChar(128)
//     BankAccountNumber   String?            @db.VarChar(50)
//     Verification        Verification[]
//     UserDetail          UserDetail         @relation(fields: [UserID], references: [UserID], onDelete: NoAction, onUpdate: NoAction, map: "UserID")
//     WebsiteCategory     WebsiteCategory    @relation(fields: [WebCategoryID], references: [WebCategoryID], onDelete: NoAction, onUpdate: NoAction, map: "WebCategoryID")
//     WhitelistWebsite    WhitelistWebsite[]
//   }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        const { WebsiteURL, WebsiteText, BankAccountName, BankAccountOwner, BankAccountNumber, WebsiteCategory } = body;

        // const newReport = await db.websiteDetail.findUnique({
        //     where: {
        //         WebsiteURL: WebsiteURL
        //     }
        // });

        // const newReport = await db.websiteDetail.create({
        //     data: {
        //     }
        // });

        // return NextResponse.json({ websiteDetail: newReport, message: "Report created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}