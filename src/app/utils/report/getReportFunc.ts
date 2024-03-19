// TODO: Create the useful function with db for the Report Page

import { db } from "@/lib/db";

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
            throw Error("Please provide the URL");
        }
    } catch (error) {
        return Promise.reject(error);
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
        return Promise.reject(error);
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