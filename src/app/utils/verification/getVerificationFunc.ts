// TODO: Create the useful function with db for the Vefication Page

import { db } from '@/lib/db';

export const getVerificationByMetaWebsiteID = async (
  metaWebsiteID: any,
  currentPercent: any,
) => {
  try {
    const verificationInfo = await db.verification.findUnique({
      where: {
        WebsiteID: metaWebsiteID,
      },
    });
    if (verificationInfo) {

      const checkOldPercentGambling = await checkPercent(verificationInfo.CGamblingPercentage, currentPercent.gambling);
      const checkOldPercentScam = await checkPercent(verificationInfo.CScamPercentage, currentPercent.scam);
      const checkOldPercentFake = await checkPercent(verificationInfo.CFakePercentage, currentPercent.fake);
      const checkOldPercentOther = await checkPercent(verificationInfo.COtherPercentage, currentPercent.other);

      if (checkOldPercentGambling == true || checkOldPercentScam == true || checkOldPercentFake == true || checkOldPercentOther == true) {
        updateCurrentPercent(verificationInfo.WebsiteID, currentPercent);
      } else {
        console.log("Current Percent still the same");
      }

      const checkMaxGambling = await checkPercent(
        verificationInfo.MGamblingPercentage,
        currentPercent.gambling
      );
      const checkMaxScam = await checkPercent(
        verificationInfo.MScamPercentage,
        currentPercent.scam
      );
      const checkMaxFake = await checkPercent(
        verificationInfo.MFakePercentage,
        currentPercent.fake
      );
      const checkMaxOthers = await checkPercent(
        verificationInfo.MOtherPercentage,
        currentPercent.other
      );

      // console.log("checkMaxFake: " + checkMaxFake);
      // console.log("checkMaxScam: " + checkMaxScam);
      // console.log("checkMaxOthers: " + checkMaxOthers);
      // console.log("checkMaxGambling: " + checkMaxGambling);
      if (checkMaxGambling == true) {
        updateMaxGamblingPercent(
          verificationInfo.WebsiteID,
          currentPercent.gambling
        );
      }
      if (checkMaxScam == true) {
        updateMaxScamPercent(verificationInfo.WebsiteID, currentPercent.scam);
      }
      if (checkMaxFake == true) {
        updateMaxFakePercent(verificationInfo.WebsiteID, currentPercent.fake);
      }
      if (checkMaxOthers == true) {
        updateMaxOtherPercent(verificationInfo.WebsiteID, currentPercent.other);
      }
      console.log(verificationInfo);
      console.log('Success Update Verification for WebID: ', metaWebsiteID);
      return verificationInfo;
    } else {
      // Create verification
      return null;
    }
  } catch (error) {
    return error;
  }
};

export const checkPercent = async (maxPercent: any, currentPercent: any) => {
  try {
    if (maxPercent >= 0 && currentPercent >= 0) {
      if (currentPercent > maxPercent) {
        return true;
      } else {
        // console.log("Not update")
        return false;
      }
    } else {
      throw Error('No have data in to checkPercent Function');
    }
  } catch (error) {
    return error;
  }
};

export const updateCurrentPercent = async (webID: any, currentPercent: any) => {
  try {
    console.log('Start->updateCurrentPercent');
    const result = await db.verification.update({
      where: {
        WebsiteID: webID,
      },
      data: {
        CGamblingPercentage: currentPercent.gambling,
        CScamPercentage: currentPercent.scam,
        CFakePercentage: currentPercent.fake,
        COtherPercentage: currentPercent.other,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->updateCurrentPercent');
    }
  } catch (error) {
    return error;
  }
};

export const updateMaxGamblingPercent = async (webID: any, maxPercent: any) => {
  try {
    console.log('Start->updateMaxGamblingPercent');
    const result = await db.verification.update({
      where: {
        WebsiteID: webID,
      },
      data: {
        MGamblingPercentage: maxPercent,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->updateMaxGamblingPercent');
    }
  } catch (error) {
    return error;
  }
};

export const updateMaxScamPercent = async (webID: any, maxPercent: any) => {
  try {
    console.log('Start->updateMaxScamPercent');
    const result = await db.verification.update({
      where: {
        WebsiteID: webID,
      },
      data: {
        MScamPercentage: maxPercent,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->updateMaxScamPercent');
    }
  } catch (error) {
    return error;
  }
};

export const updateMaxFakePercent = async (webID: any, maxPercent: any) => {
  try {
    console.log('Start->updateMaxFakePercent');
    const result = await db.verification.update({
      where: {
        WebsiteID: webID,
      },
      data: {
        MFakePercentage: maxPercent,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->updateMaxFakePercent');
    }
  } catch (error) {
    return error;
  }
};

export const updateMaxOtherPercent = async (webID: any, maxPercent: any) => {
  try {
    console.log('Start->updateMaxOtherPercent');
    const result = await db.verification.update({
      where: {
        WebsiteID: webID,
      },
      data: {
        MOtherPercentage: maxPercent,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->updateMaxOtherPercent');
    }
  } catch (error) {
    return error;
  }
};
// Function for verification part
export const createVerification = async (
  webID: any,
  currentPercent: any,
  UserVerifyID: any
) => {
  // TODO: we will keep the website only when the some of type's ML percent[Gambling, Scam, Fake] > 70
  try {
    console.log('Start->CreateVerification');
    const result = await db.verification.create({
      data: {
        WebsiteID: webID,
        UserVerifyID: UserVerifyID,
        CGamblingPercentage: currentPercent.gambling,
        CScamPercentage: currentPercent.scam,
        CFakePercentage: currentPercent.fake,
        COtherPercentage: currentPercent.other,
        MGamblingPercentage: currentPercent.gambling,
        MScamPercentage: currentPercent.scam,
        MFakePercentage: currentPercent.fake,
        MOtherPercentage: currentPercent.other,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->CreateVerification');
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const createMetaWebsite = async (
  metaWebsite: any,
  currentPercent: any,
  UserVerifyID: any
) => {
  // TODO: we will keep the website only when the some of type's ML percent[Gambling, Scam, Fake] > 70
  try {
    console.log('Start->CreateMetaWebsite');
    const webcatID = await setCategoryIDForWebMeta(currentPercent);
    console.log(metaWebsite);
    const result = await db.websiteMeta.create({
      data: {
        WebCategoryID: Number(webcatID),
        WebsiteURL: metaWebsite.url,
        WebsiteMetaTitle: metaWebsite.title[0],
        WebsiteMetaDesc: metaWebsite.description[0],
        WebsiteMetaKeyword: metaWebsite.keyword,
        WebsiteText: metaWebsite.detail,
        WebsiteStatus: metaWebsite.status,
      },
    });
    if (result) {
      console.log(result);
      console.log('Success->CreateMetaWebsite');
      const VerificationCreate = await createVerification(
        result.MetaWebsiteID,
        currentPercent,
        UserVerifyID
      );
      console.log('Verification: ', VerificationCreate);
      return VerificationCreate;
    }
  } catch (error) {
    return error;
  }
};

export const createUserVerifyBox = async (
  metaWebsite: any,
  currentPercent: any
) => {
  // TODO: we will keep the website only when the some of type's ML percent[Gambling, Scam, Fake] > 70
  let websiteStatus = true;
  try {
    console.log('Start->createUserVerifyBox');
    const websiteURL = metaWebsite.url || '';
    const websiteMetaTitle = metaWebsite.title ? metaWebsite.title[0] : null;
    const websiteMetaDesc = metaWebsite.description ? metaWebsite.description[0] : null;
    const websiteMetaKeyword = metaWebsite.keyword ? metaWebsite.keyword[0] : null;

    console.log('We here for create User verification Box');
    const result = await db.userVerifyBox.create({
      data: {
        WebsiteURL: websiteURL,
        WebsiteMetaTitle: websiteMetaTitle,
        WebsiteMetaDesc: websiteMetaDesc,
        WebsiteMetaKeyword: websiteMetaKeyword,
        WebsiteStatus: websiteStatus,
      },
    });

    console.log(result);

    if (result) {
      console.log(result);
      console.log('Success->createUserVerifyBox');
      return result;
    }
  } catch (error) {
    console.error('Error in createUserVerifyBox:', error);
    return error;
  }
};

export const setCategoryIDForWebMeta = async (currentPercent: any) => {
  try {
    let WebCategoryID;
    // ถ้า Fake กับ gambling or scam มีค่าเท่ากันเก็บอันไหน? ทำไม?
    const maxpercent = Math.max(
      Number(currentPercent.gambling),
      Number(currentPercent.scam),
      Number(currentPercent.fake)
    );
    console.log('Start set Category Here!');
    console.log('Maxpercent: ', maxpercent);
    console.log('maxpercenttostring: ', maxpercent.toString());
    switch (maxpercent.toString()) {
      case currentPercent.gambling.toString():
        WebCategoryID = 1;
        break;
      case currentPercent.scam.toString():
        WebCategoryID = 2;
        break;
      case currentPercent.fake.toString():
        WebCategoryID = 3;
        break;
      default:
        throw Error('No Maxpercent');
    }
    return WebCategoryID;
  } catch (error) {
    console.log(error);
  }
};
