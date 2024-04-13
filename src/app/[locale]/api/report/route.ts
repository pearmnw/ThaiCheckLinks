import { db } from '@/lib/db';
import { categoryTypeMapping } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const urlList = req.url?.split('=') as string[];
    const url = urlList[1];

    let maxCategoryReport: {
      _count: number;
      _type: string;
    } = {
      _count: -Infinity,
      _type: '',
    };

    let userReportCount: any = {
      other: 0,
      gambling: 0,
      scam: 0,
      fake: 0,
      sumUserReport: 0,
    };

    const groupCategoryDatabase = await db.websiteDetail.groupBy({
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

    for (let i = 0; i < groupCategoryDatabase.length; i++) {
      const categoryName =
        categoryTypeMapping[groupCategoryDatabase[i].WebCategoryID];
      const countReport = groupCategoryDatabase[i]._count.UserID;

      if (countReport > maxCategoryReport._count) {
        maxCategoryReport._count = countReport;
        maxCategoryReport._type = categoryName;
      }

      if (userReportCount.hasOwnProperty(categoryName)) {
        userReportCount[categoryName] += countReport;
      }

      // Do not count "normal" or "other" Type
      // if (categoryName !== 'other') {
      //   userReportCount.sumUserReport += countReport;
      // }

      // Pear Fixed: Count All Report
      if (categoryName != '') {
        userReportCount.sumUserReport += countReport;
      }

    }

    if (maxCategoryReport._count === 0) {
      maxCategoryReport._type = '';
    }

    return NextResponse.json({ userReportCount, maxCategoryReport });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
