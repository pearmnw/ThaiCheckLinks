import { setURL } from "@/app/utils/report/getReportFunc";

const url1 = 'https://www.youtube.com/watch?v=AS79oJ3Fcf0'
const url2 = 'https://npmjs.com/package/next-international/v/0.9.1#testing'
const url3 = 'http://translate.google.com/?sl=en&tl=th&text=In%20case%20you%20want%20to%20make%20tests%20with%20next-international%2C%20you%20will%20need%20to%20create%20a%20custom%20render.%20The%20following%20example%20uses%20%40testing-library%20and%20Vitest%2C%20but%20should%20work%20with%20Jest%20too.&op=translate'

describe("Example test of setURL function of the report feature", () => {
    // All pattern of URL
    // const urlPattern1 = /^(https:\/\/|http:\/\/)/;
    // const urlPattern2 = /^(https:\/\/www\.|http:\/\/www\.)/
    // const urlPattern3 = /^(www\.)/
    // TestCase1: URLPattern
    test('Test Pattern1', async () => {
        const result = await setURL(url1)
        expect(result).toBe('youtube.com');
    });

    test('Test Pattern2', async () => {
        const result = await setURL(url2)
        expect(result).toBe('npmjs.com');
    });

    test('Test Pattern3', async () => {
        const result = await setURL(url3)
        expect(result).toBe('translate.google.com');
    });
})
