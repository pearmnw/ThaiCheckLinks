// pages/api/urlhaus.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    const urlList = req.url?.split('=') as string[];
    const url = urlList[1];
    
    if (!url) {
      return NextResponse.json({ message: 'URL is required' });
    }

    const response = await fetch('https://urlhaus-api.abuse.ch/v1/url/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ url }).toString(),
    });

    const json_response = await response.json();

    if (json_response.query_status === 'ok') {
      return NextResponse.json(json_response);
    } else if (json_response.query_status === 'no_results') {
      return NextResponse.json({ message: 'No results' });
    } else {
      return NextResponse.json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    return NextResponse.json({ message: `Error: ${error.message}` });
  }
}
