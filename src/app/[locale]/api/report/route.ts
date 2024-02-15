import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categoryTypeMapping } from '@/lib/utils';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const urlList = req.url?.split('=') as string[];
    const url = urlList[1];

    let finalCategoryCounts: any = {
      other: 0,
      gambling: 0,
      scam: 0,
      fake: 0,
      maxType: '',
      maxReport: -Infinity,
      sumReport: 0,
    };

    const groupCategory = await db.websiteDetail.groupBy({
      by: ['WebCategoryID'],
      where: {
        WebsiteURL: {
          contains: url,
        },
      },
      _count: {
        UserID: true,
      },
      orderBy: {
        _count: {
          UserID: 'desc',
        },
      },
    });

    for (let i = 0; i < groupCategory.length; i++) {
      const categoryName = categoryTypeMapping[groupCategory[i].WebCategoryID];
      const count = groupCategory[i]._count.UserID;

      if (count > finalCategoryCounts.maxReport) {
        finalCategoryCounts.maxReport = count;
        finalCategoryCounts.maxType = categoryName;
      }

      if (finalCategoryCounts.hasOwnProperty(categoryName)) {
        finalCategoryCounts[categoryName] += count;
      }

      // Do not count "normal" or "other" Type
      if (categoryName !== 'other') {
        finalCategoryCounts.sumReport += count;
      }
    }
    
    if (finalCategoryCounts.maxReport === 0) {
      finalCategoryCounts.maxType = "";
    }



    return NextResponse.json({ finalCategoryCounts });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
