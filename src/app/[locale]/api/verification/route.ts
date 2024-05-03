// What do we have to do to store the verification information once?
// - Check the URL with table WebsiteMeta (must format the URL that the User enters as well)
// - If the URL existing in the database, we don't need to Create WebsiteMeta.
// - but check current percent and max percent and update into Verification
// - Otherwise, if URL desn't exist, we must save it to the Meta + verification website as well [in the case of > 70%]
// Note: Because the data is not yet complete, there may be cases where there is no verification yet. 
// We will create verification & userverifybox as well.

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
