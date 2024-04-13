import { setCategoryID, setURL } from "@/app/utils/report/getReportFunc";

const url1 = 'https://www.youtube.com/watch?v=AS79oJ3Fcf0'
const url2 = 'https://npmjs.com/package/next-international/v/0.9.1#testing'
const url3 = 'http://translate.google.com/?sl=en&tl=th&text=In%20case%20you%20want%20to%20make%20tests%20with%20next-international%2C%20you%20will%20need%20to%20create%20a%20custom%20render.%20The%20following%20example%20uses%20%40testing-library%20and%20Vitest%2C%20but%20should%20work%20with%20Jest%20too.&op=translate'
const urlerr = 'example.com'
const nourl = null

describe("Test of setURL function of the report feature", () => {
    // All pattern of URL
    // const urlPattern1 = /^(https:\/\/|http:\/\/)/;
    // const urlPattern2 = /^(https:\/\/www\.|http:\/\/www\.)/
    // const urlPattern3 = /^(www\.)/
    // TestCase1: URLPattern
    test('Should return correct domain of the URL by test the Pattern1', async () => {
        const result = await setURL(url1)
        expect(result).toBe('youtube.com');
    });

    test('Should return correct domain of the URL by test the Pattern2', async () => {
        const result = await setURL(url2)
        expect(result).toBe('npmjs.com');
    });

    test('Should return correct domain of the URL by test the Pattern3', async () => {
        const result = await setURL(url3)
        expect(result).toBe('translate.google.com');
    });

    test('Should throw an error for invalid URL', async () => {
        await expect(setURL(urlerr)).rejects.toThrow('This URL format not valid!!');
    });

    test('Should throw an error for missing URL', async () => {

        await expect(setURL(nourl)).rejects.toThrow('Please provide the URL');
    });

})

describe('Test of setCategoryID function of the report feature', () => {
    test('Should return correct category ID for valid inputs', async () => {
        const validCategories = ['gambling', 'scam', 'fake', 'others'];

        for (const category of validCategories) {
            const result = await setCategoryID(category);
            expect(result).toBeGreaterThanOrEqual(0);
        }
    });

    test('Should return correct category ID for gambling', async () => {
        const result = await setCategoryID('gambling');
        expect(result).toBe(1);
    });

    test('Should return correct category ID for scam', async () => {
        const result = await setCategoryID('scam');
        expect(result).toBe(2);
    });

    test('Should return correct category ID for fake', async () => {
        const result = await setCategoryID('fake');
        expect(result).toBe(3);
    });

    test('Should return correct category ID for others', async () => {
        const result = await setCategoryID('others');
        expect(result).toBe(0);
    });

    test('Should throw an error for invalid or missing category', async () => {
        const invalidCategories = [null, undefined, '', 'invalid'];

        for (const category of invalidCategories) {
            await expect(setCategoryID(category)).rejects.toThrow('Please provide the category of the website');
        }
    });
});

// The validateWebsiteDetail function to test the text input from the user.
// 1. text length is less than or equal to 50 characters
// describe('validateWebsiteDetail', () => {
//     it('should return error message if detail length is less than or equal to 50 characters', () => {
//         const detail = "This is a short detail";
//         const result = validateWebsiteDetail(detail);
//         expect(result).toBe("Please provide the details over than 50 characters");
//     });

//     it('should return "moredetailError3" if any word appears more than 3 times in the detail', () => {
//         const detail = "word1 word1 word1 word1 word2 word2 word2 word3";
//         const result = validateWebsiteDetail(detail);
//         expect(result).toBe("moredetailError3");
//     });

//     it('should return null if detail meets neither of the above conditions', () => {
//         const detail = "This is a long detail with no repeated words";
//         const result = validateWebsiteDetail(detail);
//         expect(result).toBeNull();
//     });
// });

