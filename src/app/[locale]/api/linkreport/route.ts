//     UserID              Int                @default(autoincrement())
//     WebCategoryID       Int                @default(autoincrement())
//     WebsiteURL          String
//     WebsiteText         String?
//     BankID              String?            @db.VarChar(128)
//     BankAccountOwner    String?            @db.VarChar(128)
//     BankNumber_         String?            @map("BankNumber ") @db.VarChar(50)

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
        const { UserID, WebsiteURL, WebsiteCategory, WebsiteText, BankID, BankAccountOwner, BankNumber_ } = body;
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

        const newReport = await db.websiteDetail.create({
            data: {
                UserID,
                WebsiteURL,
                WebCategoryID,
                WebsiteText,
                BankID,
                BankAccountOwner,
                BankNumber_,
                WebsiteStatus
            }
        });

        return NextResponse.json({ websiteDetail: newReport, message: "Report created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}