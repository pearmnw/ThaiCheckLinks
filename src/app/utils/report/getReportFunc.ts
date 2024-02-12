// TODO: Create the useful function with db for the Report Page

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
  
//   model WhitelistWebsite {
//     WhitelistID          Int            @id @default(autoincrement())
//     WhitelistURL         String
//     WhitelistMetaTitle   String?
//     WhitelistMetaDesc    String?
//     WhistlistMetaKeyword String?
//     WhitelistText        String?
//     Verification         Verification[]
// }