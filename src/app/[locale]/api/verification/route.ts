// เราต้องทำอะไรบ้างในการจะเก็บ Verification 1 ครั้ง
// - เช็ค URL with table WebsiteMeta (ต้องจัดformatURLที่ User ใส่เข้ามาด้วย)
// - ถ้ามีก็ไม่ต้อง Create WebsiteMeta
//   - แต่ check current percent กับ max percent แล้วเก็บเข้า Verification
//   หมายเหตุ: เนื่องจากดาต้ายังไม่ครบถ้วนอาจจะมีในกรณีที่ยังไม่มี verification ด้วย ก็จะทำการ create verification
// - ถ้าไม่มีต้องเก็บเข้าเว็บไซต์ Meta + UserVerifyBox + verification ด้วย [ในกรณีที่ซักประเภท>70%]

import { getWebsiteMetaByURL, setURL } from '@/app/utils/report/getReportFunc';
import {
    createMetaWebsite,
    createUserVerifyBox,
    createVerification,
    getVerificationByMetaWebsiteID,
} from '@/app/utils/verification/getVerificationFunc';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        let { WebsiteURL, MetaWebsite, CurrentPercent } = body;
        console.log('Meta: ', MetaWebsite);
        console.log('Percent: ', CurrentPercent);
        // TODO: Call setURL Function to Clean the URL to match the existing URL in WebsiteMeta
        const URL = await setURL(WebsiteURL);
        // TODO: Call getWebsiteMetaByURL function to check existing url in WebsiteMeta
        const websiteMetaArray: any = await getWebsiteMetaByURL(URL);
        let websiteMeta;
        let webVerification;
        let getVeriInfo;
        // let createUserVeriBox;
        let methodsucces: boolean = false;
        let verificationInfo;
        if (websiteMetaArray != null) {
            // Result is an array, actually each link must be unique!!
            if (websiteMetaArray.length > 0) {
                // So we can access just the first element
                console.log('Entry state 1: this url have in database');
                websiteMeta = websiteMetaArray[0];
                console.log(websiteMeta.MetaWebsiteID);
                webVerification = await getVerificationByMetaWebsiteID(
                    websiteMeta.MetaWebsiteID,
                    CurrentPercent
                );
                //TODO: Check that website have info in Verification Table && UserVerifyBox
                if (webVerification) {
                    console.log('GetVerificationTable: ', webVerification);
                    getVeriInfo = webVerification;
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
                console.log('Entry state 2: this url no have in verification database');
                if (
                    CurrentPercent.gambling >= 70 ||
                    CurrentPercent.scam >= 70 ||
                    CurrentPercent.fake >= 70
                ) {
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
                    }
                } else {
                    console.log('The percent are not pass the threshold');
                }
            }
            return NextResponse.json(
                {
                    VerificationInfo: getVeriInfo,
                    message: 'Verification created successfully',
                },
                { status: 201 }
            );
        } else {
            console.log('Entry state 2: this url no have in verification database');
            return NextResponse.json(
                {
                    VerificationInfo: null,
                    message: 'Verification is null',
                },
                { status: 201 }
            );
        }
    } catch (error: any) {
        console.error(error);
        // Return or log the error message
        return NextResponse.json({ message: error.message || 'Unknown error' });
    }
}
