import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const urlList = req.url?.split('=') as string[];
  const url = urlList[1];

  const apiURL = `https://api.codetabs.com/v1/alexa?web=${url}`;

  try {
    const apiResponse = await fetch(apiURL);
    if (!apiResponse.ok) {
      throw new Error(`API responded with status code: ${apiResponse.status}`);
    }
    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
