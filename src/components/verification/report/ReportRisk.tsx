import { useScopedI18n } from '@/locales/client';
import React, { useContext } from 'react';
import CircularProgressBar from './CircularProgressBar';
import { VerificationContext } from '../Verification';

const ReportRisk = () => {
  const t = useScopedI18n('verificationpage');
  const { userReportCount } = useContext(VerificationContext).overviewScore;

  return (
    <div className='bg-custom-bg-moredetail flex flex-col justify-start items-center p-5 gap-2 rounded-xl m-3 w-2/3 h-[450px]'>
      <h4 className='text-xl font-semibold'>{t('risk-title-count')}</h4>
      <ul className='text-custom-black flex flex-col justify-center items-start'>
        <li className='flex flex-row justify-center items-center'>
          <span className='inline-block w-3 h-3 mr-2 bg-green-500 rounded-full'></span>
          <p className='text-lg font-normal'>{t('low-risk-count')}</p>
        </li>
        <li className='flex flex-row justify-center items-center'>
          <span className='inline-block w-3 h-3 mr-2 bg-yellow-500 rounded-full'></span>
          <p className='text-lg font-normal'>{t('moderate-risk-count')}</p>
        </li>
        <li className='flex flex-row justify-center items-center'>
          <span className='inline-block w-3 h-3 mr-2 bg-orange-500 rounded-full'></span>
          <p className='text-lg font-normal'>{t('quite-high-risk-count')}</p>
        </li>
        <li className='flex flex-row justify-center items-center'>
          <span className='inline-block w-3 h-3 mr-2 bg-red-500 rounded-full'></span>
          <p className='text-lg font-normal'>{t('serious-risk-count')}</p>
        </li>
      </ul>

      <CircularProgressBar score={userReportCount.sumUserReport} />
    </div>
  );
};

export default ReportRisk;
