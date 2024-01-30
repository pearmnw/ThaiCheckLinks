import { useScopedI18n } from '@/locales/client';
import React from 'react'
import { IdentifyRiskProps } from '@/lib/interface/moredetail/interface';

const IdentifyRisk: React.FC<IdentifyRiskProps> = ({ checked, identifyRisk }) => {
  const t = useScopedI18n('moredetailpage')
  return (
    <div className='flex flex-row flex-start items-center gap-5'>
      {t('risk-score')}
      <span className='text-red-600 font-bold'>
        {checked ? identifyRisk : t('No Result')}
      </span>
    </div>
  );
};

export default IdentifyRisk
