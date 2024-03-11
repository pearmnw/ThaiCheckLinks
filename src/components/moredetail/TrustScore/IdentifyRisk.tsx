import { useScopedI18n } from '@/locales/client';
import React from 'react'
import { IdentifyRiskProps } from '@/lib/interface/moredetail/interface';

const IdentifyRisk: React.FC<IdentifyRiskProps> = ({ checked, identifyRisk }) => {
  const t = useScopedI18n('verificationpage')
  return (
    <div className='flex flex-row flex-start items-center gap-5'>
      {t('measure-risk-title')}
      <span className='text-red-600 font-bold'>
        {checked ? identifyRisk : t('No Result')}
      </span>
    </div>
  );
};

export default IdentifyRisk
