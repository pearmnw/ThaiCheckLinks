// TODO: Create the useful function with db for the Vefication Page

// model WebsiteMeta {
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

// model Verification {
//     VerificationID      Int              @id @default(autoincrement())
//     WebsiteID           Int              @default(autoincrement())
//     WhitelistID         Int              @default(autoincrement())
//     UserVerifyID        Int              @default(autoincrement())
//     CGamblingPercentage Int
//     CScamPercentage     Int
//     CFakePercentage     Int
//     COtherPercentage    Int
//     CVerifyDate         DateTime         @db.Timestamptz(6)
//     MGamblingPercentage Int
//     MScamPercentage     Int
//     MFakePercentage     Int
//     MOtherPercentage    Int
//     MVerifyDate         DateTime         @default(now()) @db.Timestamptz(6)
//     UserVerifyBox       UserVerifyBox    @relation(fields: [UserVerifyID], references: [UserVerifyID], onDelete: NoAction, onUpdate: NoAction, map: "UserVerifyID")
//     WebsiteDetail       WebsiteDetail    @relation(fields: [WebsiteID], references: [WebsiteID], onDelete: NoAction, onUpdate: NoAction, map: "WebsiteID")
//     WhitelistWebsite    WhitelistWebsite @relation(fields: [WhitelistID], references: [WhitelistID], onDelete: NoAction, onUpdate: NoAction, map: "WhitelistID")
//   }

export const getMaxPercent = async () => {
    try {

    } catch (error) {
        return error;
    }
}