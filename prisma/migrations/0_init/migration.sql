-- CreateTable
CREATE TABLE "UserDetail" (
    "UserID" SERIAL NOT NULL,
    "UserName" VARCHAR(128) NOT NULL,
    "UserEmail" VARCHAR(128) NOT NULL,
    "UserPhone" VARCHAR(25),
    "UserPassword" TEXT NOT NULL,
    "UserJoinedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserPictureURL" TEXT,
    "UserLastLogin" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "UserVerifyBox" (
    "UserVerifyID" SERIAL NOT NULL,
    "WebsiteURL" VARCHAR(256) NOT NULL,
    "WebsiteMetaTitle" TEXT,
    "WebsiteMetaDesc" TEXT,
    "WebsiteMetaKeyword" TEXT,
    "WebsiteStatus" BOOLEAN NOT NULL,

    CONSTRAINT "UserVerifyBox_pkey" PRIMARY KEY ("UserVerifyID")
);

-- CreateTable
CREATE TABLE "Verification" (
    "VerificationID" SERIAL NOT NULL,
    "WebsiteID" SERIAL NOT NULL,
    "WhitelistID" SERIAL NOT NULL,
    "UserVerifyID" SERIAL NOT NULL,
    "CGamblingPercentage" INTEGER NOT NULL,
    "CScamPercentage" INTEGER NOT NULL,
    "CFakePercentage" INTEGER NOT NULL,
    "COtherPercentage" INTEGER NOT NULL,
    "CVerifyDate" TIMESTAMPTZ(6) NOT NULL,
    "MGamblingPercentage" INTEGER NOT NULL,
    "MScamPercentage" INTEGER NOT NULL,
    "MFakePercentage" INTEGER NOT NULL,
    "MOtherPercentage" INTEGER NOT NULL,
    "MVerifyDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("VerificationID")
);

-- CreateTable
CREATE TABLE "WebsiteCategory" (
    "WebCategoryID" SERIAL NOT NULL,
    "WebCategoryName" VARCHAR(128) NOT NULL,

    CONSTRAINT "WebsiteCategory_pkey" PRIMARY KEY ("WebCategoryID")
);

-- CreateTable
CREATE TABLE "WebsiteDetail" (
    "WebsiteID" SERIAL NOT NULL,
    "UserID" SERIAL NOT NULL,
    "WebCategoryID" SERIAL NOT NULL,
    "WebsiteURL" TEXT NOT NULL,
    "WebsiteMetaTitle" TEXT,
    "WebsiteMetaDesc" TEXT,
    "WebsiteMetaKeyword" TEXT,
    "WebsiteText" TEXT,
    "WebsiteStatus" BOOLEAN NOT NULL,
    "WebsiteReportedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "BankID" VARCHAR(128),
    "BankAccountOwner" VARCHAR(128),
    "BankNumber " VARCHAR(50),

    CONSTRAINT "WebsiteDetail_pkey" PRIMARY KEY ("WebsiteID")
);

-- CreateTable
CREATE TABLE "WhitelistWebsite" (
    "WhitelistID" SERIAL NOT NULL,
    "WebsiteID" SERIAL NOT NULL,
    "WhitelistURL" TEXT NOT NULL,
    "WhitelistMetaTitle" TEXT,
    "WhitelistMetaDesc" TEXT,
    "WhistlistMetaKeyword" TEXT,
    "WhitelistText" TEXT,

    CONSTRAINT "WhitelistWebsite_pkey" PRIMARY KEY ("WhitelistID")
);

-- CreateTable
CREATE TABLE "Bank" (
    "BankID" VARCHAR(128) NOT NULL,
    "BankName" VARCHAR(256),

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("BankID")
);

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "UserVerifyID" FOREIGN KEY ("UserVerifyID") REFERENCES "UserVerifyBox"("UserVerifyID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "WebsiteID" FOREIGN KEY ("WebsiteID") REFERENCES "WebsiteDetail"("WebsiteID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "WhitelistID" FOREIGN KEY ("WhitelistID") REFERENCES "WhitelistWebsite"("WhitelistID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WebsiteDetail" ADD CONSTRAINT "BankID" FOREIGN KEY ("BankID") REFERENCES "Bank"("BankID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WebsiteDetail" ADD CONSTRAINT "WebCategoryID" FOREIGN KEY ("WebCategoryID") REFERENCES "WebsiteCategory"("WebCategoryID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WebsiteDetail" ADD CONSTRAINT "WebsiteDetail_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "UserDetail"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WhitelistWebsite" ADD CONSTRAINT "WebsiteID" FOREIGN KEY ("WebsiteID") REFERENCES "WebsiteDetail"("WebsiteID") ON DELETE NO ACTION ON UPDATE NO ACTION;

