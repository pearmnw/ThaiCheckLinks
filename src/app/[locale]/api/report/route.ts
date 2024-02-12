import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const urlList = req.url?.split('=') as string[];
    const url = urlList[1];

    const WebsiteURL = await db.websiteDetail.findMany({
      where: { WebsiteURL: url },
    });

    console.log(WebsiteURL);

    return NextResponse.json({ WebsiteURL: WebsiteURL });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}