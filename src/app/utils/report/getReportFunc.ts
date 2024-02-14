// TODO: Create the useful function with db for the Report Page

import { db } from "@/lib/db";

// model WebsiteCategory {
//     WebCategoryID   Int             @id @default(autoincrement())
//     WebCategoryName String          @db.VarChar(128)
//     WebsiteDetail   WebsiteDetail[]
//     WebsiteMeta     WebsiteMeta[]
//   }

//   model WebsiteDetail {
//     WebsiteID              Int             @id @default(autoincrement())
//     UserID                 Int             @default(autoincrement())
//     WebCategoryID          Int             @default(autoincrement())
//     WebsiteURL             String
//     WebsiteReportedDate    DateTime        @default(now()) @db.Timestamptz(6)
//     BankID                 String?         @db.VarChar(128)
//     BankAccountOwner       String?         @db.VarChar(128)
//     BankNumber_            String?         @map("BankNumber ") @db.VarChar(50)
//     WebsiteReportedDetails String
//     Verification           Verification[]
//     Bank                   Bank?           @relation(fields: [BankID], references: [BankID], onDelete: NoAction, onUpdate: NoAction, map: "BankID")
//     UserDetail             UserDetail      @relation(fields: [UserID], references: [UserID], onDelete: NoAction, onUpdate: NoAction, map: "UserID")
//     WebsiteCategory        WebsiteCategory @relation(fields: [WebCategoryID], references: [WebCategoryID], onDelete: NoAction, onUpdate: NoAction, map: "WebCategoryID")
//   }

//   model WhitelistWebsite {
//     WhitelistID          Int            @id @default(autoincrement())
//     WhitelistURL         String
//     WhitelistMetaTitle   String?
//     WhitelistMetaDesc    String?
//     WhistlistMetaKeyword String?
//     WhitelistText        String?
//     Verification         Verification[]
// }

export const setURL = async (url: any) => {
    try {
        const urlPattern1 = /^(https:\/\/|http:\/\/)/;
        const urlPattern2 = /^(https:\/\/www\.|http:\/\/www\.)/
        const urlPattern3 = /^(www\.)/
        if (url) {
            if (url.match(urlPattern2) || url.match(urlPattern3)) {
                const split1 = url.split("www.")
                console.log(split1);
                const split2 = split1[1].split("/");
                console.log(split2);
                return split2[0];
            }
            else if (url.match(urlPattern1)) {
                const split1 = url.split("//")
                console.log(split1);
                const split2 = split1[1].split("/");
                console.log(split2);
                return split2[0];
            }
            else {
                throw Error("This URL format not valid!!");
            }
        } else {
            throw Error("No have URL Ka");
        }
    } catch (error) {
        return error;
    }
}

export const setCategoryID = async (WebsiteCategory: any) => {
    try {
        let WebCategoryID;
        switch (WebsiteCategory) {
            case "default":
                throw Error("Please provide the category of the website")
            // return NextResponse.json({ WebsiteDetail: null, message: "Please provide the category of the website" }, { status: 409 });
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
                throw Error("Please provide the category of the website")
            // return NextResponse.json({ WebsiteDetail: null, message: "Please provide the category of the website" }, { status: 409 });
        }
        return WebCategoryID;
    } catch (error) {
        console.log(error);
    }
}

export const getWebsiteMetaByURL = async (url: any) => {
    try {
        const result = await db.websiteMeta.findMany({
            where: {
                WebsiteURL: {
                    contains: url
                }
            }
        }
        )
        if (result) {
            return result;
        }
        else {
            return null;
        }
    } catch (error) {
        return error;
    }
}

//   model WebsiteMeta {
//     MetaWebsiteID      Int             @id @default(autoincrement())
//     WebCategoryID      Int             @default(autoincrement())
//     WebsiteURL         String?
//     WebsiteMetaTitle   String?
//     WebsiteMetaDesc    String?
//     WebsiteMetaKeyword String?
//     WebsiteText        String?
//     WebsiteStatus      Boolean?        @default(true)
//     WebsiteCategory    WebsiteCategory @relation(fields: [WebCategoryID], references: [WebCategoryID], onDelete: NoAction, onUpdate: NoAction, map: "WebCategoryID")
//   }

export const createMetaWebsite = async (MetaWebsite: any) => {
    // รอเกณฑ์การคิดคะแนน
}