import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import React from 'react';

const ReportHeader: React.FC<any> = ({ report }) => {
  const t = useScopedI18n('verificationpage');

  return (
    <div className='flex flex-col justify-center items-start text-custom-black gap-5 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-3xl font-bold'>{t('report-title')}</h2>
        <Link href='#myOverall'>
          <h2 className='text-2xl font-semibold underline'>
            {t('see-overview')}
          </h2>
        </Link>
      </div>

      <h3 className='text-3xl font-medium text-custom-blue'>
        {t('report-subtitle')}
      </h3>

      <h3 className='text-4xl font-semibold text-custom-black w-full text-center my-8'>
        {t('report-title-result')}:{' '}
        {(report.maxType === "other") ? (
          <span style={{ color: '#04CE00' }}>{t('report-not-found')}</span>
        ) : (
          <span style={{ color: '#B51A36' }}>{t('report-found')}</span>
        )}
      </h3>
    </div>
  );
};

export default ReportHeader;
