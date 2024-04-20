// TODO: Create the useful function with db for the Report Page

import { db } from "@/lib/db";

export const setURL = async (url: any) => {
    try {
        // This is the second verification for the URL
        // https://example.com/path or http://example.com/path
        const urlPattern1 = /^(https:\/\/|http:\/\/)/;
        // https://www.example.com/path or http://www.example.com/path
        const urlPattern2 = /^(https:\/\/www\.|http:\/\/www\.)/;
        // www.example.com/path
        const urlPattern3 = /^(www\.)/;
        // example.com/path
        const urlPattern4 = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z0-9-]{2,})?(\/\S*)?$/;
        if (!url) {
            throw new Error("Please provide the URL");
        }

        if (url.match(urlPattern2) || url.match(urlPattern3)) {
            const split1 = url.split("www.");
            const split2 = split1[1].split("/");
            return split2[0];
        } else if (url.match(urlPattern1)) {
            const split1 = url.split("//");
            const split2 = split1[1].split("/");
            return split2[0];
        } else if (url.match(urlPattern4)) {
            const split1 = url.split("/");
            return split1[0];
        } else {
            throw new Error("This URL format is not valid!!");
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