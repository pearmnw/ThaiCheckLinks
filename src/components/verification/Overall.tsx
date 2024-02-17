import { useScopedI18n } from '@/locales/client'
import React, { useState } from 'react'
import CircularProgressBar from './overall/CircularProgressBar';
import RiskMeasurement from './overall/RiskMeasurement';
import Link from 'next/link';

const Overall = () => {
  const t = useScopedI18n('verificationpage');

  return (
    <section
      className='flex flex-col gap-3 justify-center items-start px-8 py-8 border-b-2 border-custom-black'
      id='myOverall'
    >
      <div className='flex flex-col justify-center items-start text-custom-black gap-5 w-full'>
        <h2 className='text-3xl font-bold'>{t('overall-title')}</h2>
        <h3 className='text-3xl font-medium text-custom-blue'>
          {t('overall-subtitle')}
        </h3>
      </div>

      <div className='flex flex-col justify-center items-center gap-1 w-full'>
        
        {/* TODO: Calculate the Score */}
        <CircularProgressBar />
        <RiskMeasurement />
        <Link href="/report">
          <button className="bg-custom-black rounded-3xl text-white shadow-xl p-2 w-64 text-lg font-semibold">
            Report
          </button>
        </Link>
        <h5 className="text-gray-400 font-semibold text-lg">
          *{t('click-here')}
        </h5>
      </div>
    </section>
  );
}

export default Overall

