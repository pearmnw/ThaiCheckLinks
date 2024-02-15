import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import React from 'react';

const RiskMeasurement: React.FC<any> = ({ report }) => {
  const t = useScopedI18n('verificationpage');

  // Get color based on the score
  const getColorReport = (score: number) => {
    if (score > 0 && score <= 5) {
      return '#04CE00';
    } else if (score > 5 && score <= 10) {
      return '#F2CC6B';
    } else if (score > 10 && score <= 15) {
      return '#F97316';
    } else if (score > 15) {
      return '#B51A36';
    } else {
      return '#B51A36';
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-3 p-4'>
        <h4 className='text-xl font-semibold text-custom-black'>
          {t('risk-measurement-citeria')}
        </h4>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-3 w-full'>
          <div className='border-2 border-custom-black rounded-lg shadow-md bg-white w-2/4 h-56 py-3 px-5 flex flex-col justify-between'>
            <p className='text-custom-black font-medium text-lg h-2/6 min-h-20'>
              {t('found-thai-scam-link')}
            </p>
            <div
              className='text-center text-5xl font-bold'
              style={{ color: getColorReport(report.maxReport) }}
            >

              {report.maxReport === 0 || report.maxType === 'other' ? (
                <p className='text-4xl' style={{ color: '#04CE00' }}>
                  {t('NOT FOUND')}
                </p>
              ) : (
                <div className='flex flex-col gap-1'>
                  {report.maxReport} {t('report-unit')}
                  <p className='text-sm'>
                    *{t('report-most')} "{t(report.maxType)}"
                  </p>
                </div>
              )}
              
            </div>
            <div className='text-right underline font-medium'>
              <Link href='#myReport'>{t('seemore')}</Link>
            </div>
          </div>
          <div className='border-2  border-custom-black rounded-lg shadow-xl bg-white w-2/4 h-56 py-3 px-5 flex flex-col justify-between'>
            <p className='text-custom-black font-medium text-lg h-2/6 min-h-20'>
              {t('found-ai')}
            </p>
            <div
              className='text-center text-5xl font-bold'
              style={{ color: '#B51A36' }}
            >
              100%
            </div>
            <div className='text-right underline font-medium'>
              <Link href='#myAI'>{t('seemore')}</Link>
            </div>
          </div>
          <div className='border-2 border-custom-black rounded-lg shadow-xl bg-white w-2/4 h-56 py-3 px-5 flex flex-col justify-between'>
            <p className='text-custom-black font-medium text-lg h-2/6 min-h-20'>
              {t('url-measure')}
            </p>
            <div
              className='text-center text-5xl font-bold'
              style={{ color: '#B51A36' }}
            >
              100%
            </div>
            <div className='text-right underline font-medium'>
              <Link href='#myURL'>{t('seemore')}</Link>
            </div>
          </div>
          <div className='border-2 border-custom-black rounded-lg shadow-xl bg-white w-2/4 h-56 py-3 px-5 flex flex-col justify-between'>
            <p className='text-custom-black font-medium text-lg h-2/6 min-h-20 '>
              {t('found-other-database')}
            </p>
            <div
              className='text-center text-5xl font-bold'
              style={{ color: '#B51A36' }}
            >
              100%
            </div>
            <div className='text-right underline font-medium'>
              <Link href='#myAPI'>{t('seemore')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMeasurement;
