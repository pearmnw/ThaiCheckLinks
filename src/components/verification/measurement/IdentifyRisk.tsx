import { useScopedI18n } from '@/locales/client';
import React, { useState, useEffect } from 'react'
import { IdentifyRiskProps } from '@/lib/interface/verification/interface';

const IdentifyRisk: React.FC<IdentifyRiskProps> = ({ checked, riskLabel, color, }) => {
  const t = useScopedI18n('verificationpage')

  return (
    <div className='flex flex-row flex-start items-center gap-5 text-3xl text-custom-black font-bold'>
      <h4>{t('measure-risk-title')}:</h4>
      <span className='' style={{ color: color }}>
        {checked ? riskLabel : t('No Result')}
      </span>
    </div>
  );
};

export default IdentifyRisk
