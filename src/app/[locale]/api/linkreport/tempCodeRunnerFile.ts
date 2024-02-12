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