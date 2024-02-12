// TODO: Create the useful function with db for the Vefication Page

// model UserVerifyBox {
//     UserVerifyID       Int            @id @default(autoincrement())
//     WebsiteURL         String         @db.VarChar(256)
//     WebsiteMetaTitle   String?
//     WebsiteMetaDesc    String?
//     WebsiteMetaKeyword String?
//     WebsiteStatus      Boolean
//     Verification       Verification[]
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