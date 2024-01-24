import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  
  const urlList = req.url?.split("=") as string[]
  const url = urlList[1]

  const apiURL = `https://www.ipqualityscore.com/api/json/url/LP354YU4k4zw1xd1WEM9qcFuqCqORAvQ/${url}`;

  try {
    const apiResponse = await fetch(apiURL);
    if (!apiResponse.ok) {
      throw new Error(`API responded with status code: ${apiResponse.status}`);
    }
    const data = await apiResponse.json();

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
