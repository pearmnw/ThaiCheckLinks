// เราต้องทำอะไรบ้างในการจะเก็บ report 1 ครั้ง
// - เช็ค URL with table WebsiteMeta (ต้องจัดformatURLที่ User ใส่เข้ามาด้วย)
// - ถ้ามีก็ไม่ต้อง Create WebsiteMeta
//   - แต่ check current percent กับ max percent แล้ว update เข้า Verification
//   หมายเหตุ: เนื่องจากดาต้ายังไม่ครบถ้วนอาจจะมีในกรณีที่ยังไม่มี verification ด้วย ก็จะทำการ create verification & userverifybox ด้วย
// - ถ้าไม่มีต้องเก็บเข้าเว็บไซต์ Meta + verification ด้วย [ในกรณีที่ซักประเภท>70%]

import { getWebsiteMetaByURL, setCategoryID, setURL } from "@/app/utils/report/getReportFunc";
import { createMetaWebsite, createUserVerifyBox, createVerification, getVerificationByMetaWebsiteID } from "@/app/utils/verification/getVerificationFunc";
import { db } from "@/lib/db";
import { getScopedI18n } from "@/locales/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const t = await getScopedI18n("errormessage");
        const body = await req.json();
        console.log(body);
        const session = getServerSession(authOptions);
        const currUserSession = JSON.stringify(session);
        console.log(currUserSession);
        let { UserID, WebsiteURL, WebsiteCategory, BankID, BankAccountOwner, BankNumber, PhoneNumber, WebsiteReportedDetails, MetaWebsite, CurrentPercent } = body
        // TODO: SetCategoryID
        const webcatID = await setCategoryID(WebsiteCategory);
        console.log("userID: ", UserID);
        console.log("webcatID: ", webcatID);
        console.log("reportDetails: ", WebsiteReportedDetails)
        console.log("Meta: ", MetaWebsite);
        console.log("Percent: ", CurrentPercent);
        // TODO: Call setURL Function to Clean the URL to match the existing URL in WebsiteMeta
        const URL = await setURL(WebsiteURL);
        // TODO: Call getWebsiteMetaByURL function to check existing url in WebsiteMeta
        const websiteMetaArray: any = await getWebsiteMetaByURL(URL);
        let websiteMeta;
        let webVerification;
        let getVeriInfo;
        let methodsucces = false;
        // Result is an array, actually each link must be unique!!
        if (websiteMetaArray.length > 0) {
            // So we can access just the first element
            console.log("Entry state 1: this url have in database")
            websiteMeta = websiteMetaArray[0];
            console.log(websiteMeta.MetaWebsiteID);
            webVerification = await getVerificationByMetaWebsiteID(websiteMeta.MetaWebsiteID, CurrentPercent);
            // Have Verification data: assume that it also has UserVerify data
            if (webVerification) {
                console.log("GetVerificationTable: ", webVerification)
                methodsucces = true;
            }
            else {
                // TODO: Create UserVeriBox && Create Verification
                const createUserVeriBox: any = await createUserVerifyBox(
                    MetaWebsite,
                    CurrentPercent
                );
                if (!!createUserVeriBox == true) {
                    getVeriInfo = await createVerification(
                        websiteMeta.MetaWebsiteID,
                        CurrentPercent,
                        createUserVeriBox.UserVerifyID
                    );
                    methodsucces = true;
                    console.log(getVeriInfo);
                }
            }
        } else {
            console.log("Entry state 2: this url no have in database")
            if (CurrentPercent.gambling >= 70 || CurrentPercent.scam >= 70 || CurrentPercent.fake >= 70) {
                const createUserVeriBox: any = await createUserVerifyBox(
                    MetaWebsite,
                    CurrentPercent
                );
                if (!!createUserVeriBox == true) {
                    getVeriInfo = await createMetaWebsite(
                        MetaWebsite,
                        CurrentPercent,
                        createUserVeriBox.UserVerifyID
                    );
                    methodsucces = true;
                    console.log(getVeriInfo);
                }
            }
            else {
                methodsucces = true;
                console.log("The percent are not pass the threshold");
            }
        }
        // TODO: Create WebsiteDetails [report details]
        if (!BankID.length) {
            BankID = null;
        }
        if (!BankAccountOwner.length) {
            BankAccountOwner = null;
        }
        if (!BankNumber.length) {
            BankNumber = null;
        }
        if (!PhoneNumber.length) {
            PhoneNumber = null;
        }
        let newReport;
        if (methodsucces) {
            console.log("Create Report here!!")
            newReport = await db.websiteDetail.create({
                data: {
                    UserID: parseInt(UserID), // Ensure UserID is converted to a number, set to undefined if NaN
                    WebCategoryID: Number(webcatID),
                    WebsiteURL,
                    BankID,
                    BankAccountOwner,
                    BankNumber,
                    WebsiteReportedDetails,
                    PhoneNumber
                }
            });
            console.log(newReport);
            return NextResponse.json({ websiteDetail: newReport, message: t("reportsuccess") }, { status: 201 });
        }
        else {
            console.log("Cannot Create Report here!!")
            throw Error("Something go wrong")
        }
    } catch (error: any) {
        console.error(error);
        // Return or log the error message
        return NextResponse.json({ websiteDetail: null, message: error.message || 'Unknown error' });
    }
}