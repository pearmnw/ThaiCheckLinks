import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeRequest = (url: any): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  return url;
};

export const getDomainName = (url: string) => {
  try {
    if (url.startsWith('https://')) {
      url = url.replace(/^https?:\/\//, '');
    }
    if (url.startsWith('http://')) {
      url = url.replace(/^https?:\/\//, '');
    }
    if (url.startsWith('www.')) {
      url = url.substring(4);
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
  return url;
};

export const categoryTypeMapping: any = {
  0: 'other',
  1: 'gambling',
  2: 'scam',
  3: 'fake',
};

export const defaultOverviewScore: any = {
  isShow: false,
  riskScoreOverall: 0,
  maliciousUrlOverall: 0,
  userReportCount: {
    gambling: 0,
    scam: 0,
    fake: 0,
    other: 0,
    sumUserReport: 0,
  },
  maxCategoryReport: {
    _count: 0,
    _type: '',
  },
  highestVerifyOverall: {
    _count: 0,
    _type: '',
  },
  currentPercent: {
    other: 0,
    gambling: 0,
    scam: 0,
    fake: 0,
  },
  maxPercent: {
    maxOther: 0,
    maxGambling: 0,
    maxScam: 0,
    maxFake: 0,
  },
  hasAnotherDatabase: [
    {
      name: 'IPQuality',
      status: null,
    },
    {
      name: 'URLHaus',
      status: null,
    },
  ],
};

export const getHighestVerifyScore = (percent: Record<string, number>) => {
  const [_type, _count] = Object.entries(percent).reduce(
    (acc, [key, value]) => {
      if (value > acc[1]) {
        return [key, value];
      } else {
        return acc;
      }
    },
    ['', 0]
  );

  return { _count: _count, _type: _type };
};

export const scaleNumber = (
  newRangeStart: number,
  newRangeEnd: number,
  oldRangeStart: number,
  oldRangeEnd: number
) => {
  return (newRangeEnd - newRangeStart) / (oldRangeEnd - oldRangeStart);
};

export const getMaliciousScore = (urlScore: number, isRisk: any) => {
  const newRangeStart = 0;
  const oldRangeStart = 0;
  let count = 0;

  const scaledUrlFactor = scaleNumber(newRangeStart, 25, oldRangeStart, 100);
  const scaledUrlScore = (urlScore - newRangeStart) * scaledUrlFactor + oldRangeStart;


  for (let key in isRisk) {
    if (isRisk[key] === true) {
      count += 1
    }
  }
  const scaledRiskFactor = scaleNumber(newRangeStart, 75, oldRangeStart, 3);
  const scaledRiskScore = (count - newRangeStart) * scaledRiskFactor + oldRangeStart;

  return Math.round(scaledUrlScore + scaledRiskScore);
};

export const countStatus = async (entities: any) => {
  return entities.filter(
    (db: any) => db.status === 'FOUND' || db.status === 'ค้นพบ'
  ).length;
}

