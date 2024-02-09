import { useScopedI18n } from '@/locales/client'
import React, { useState, useEffect } from 'react'
import MeasureHeader from './measurement/MeasureHeader'
import IdentifyRisk from './measurement/IdentifyRisk'
import Score from './measurement/Score'

const Measurement = () => {
  const t = useScopedI18n('verificationpage')
  const [score, setScore] = useState(50)
  const [maxScore, setMaxScore] = useState(100)
  const [checked, setChecked] = useState(true)
  const [riskLabel, setRiskLabel] = useState('');

  useEffect(() => {
    setRiskLabel(label);
  }, [score, t]);

  const getColor = () => {
    if (score > 0 && score <= 25) {
      return { color: '#04CE00', label: t('low-count') };
    } else if (score > 25 && score <= 50) {
      return { color: '#F2CC6B', label: t('quite-low-count') };
    } else if (score > 50 && score <= 75) {
      return { color: '#F97316', label: t('quite-high-count') };
    } else if (score > 75) {
      return { color: '#B51A36', label: t('high-count') };
    }
    return { color: '#ccc', label: t('No Result') };
  };

  const { color, label } = getColor();


  return (
    <section className='px-8 border-b-2 border-custom-black' id='myReport'>
      <MeasureHeader />
      <div className='bg-custom-bg-moredetail w-full rounded-xl pt-5 pb-12 px-7 my-5'>
        <div className='flex flex-col justify-center items-start gap-1'>
          <IdentifyRisk checked={checked} color={color} riskLabel={riskLabel} />
          <Score score={score} maxScore={maxScore} color={color} />
        </div>
      </div>
    </section>
  );
}

export default Measurement
