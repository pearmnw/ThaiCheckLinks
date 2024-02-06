import { useScopedI18n } from '@/locales/client'
import Link from 'next/link';
import React from 'react'

const RiskMeasurement = () => {
  const t = useScopedI18n('verificationpage')

  return (
    <article>
      <div className='flex flex-col justify-center items-center gap-3 p-4'>
        <h4 className='text-xl font-semibold text-custom-black'>
          {t('risk-measurement-citeria')}
        </h4>
        <div className='flex flex-col lg:flex-row justify-center items-center w-2/3 gap-3'>
          <div className='border-2 border-custom-black rounded-lg shadow-md bg-white w-1/4 h-48 py-3 px-5 flex flex-col justify-start gap-2'>
            <p className='text-custom-black font-medium text-lg h-3/6 min-h-20'>
              {t('found-thai-scam-link')}
            </p>
            <div className='text-center text-5xl font-bold'>100%</div>
            <div className='text-right underline font-medium'>
              <Link href="#myReport">
                {t('seemore')}
              </Link>
            </div>
          </div>
          <div className='border-2  border-custom-black rounded-lg shadow-xl bg-white w-1/4 h-48 py-3 px-5 flex flex-col justify-start gap-2'>
            <p className='text-custom-black font-medium text-lg h-3/6 min-h-20'>
              {t('found-ai')}
            </p>
            <div className='text-center text-5xl font-bold'>100%</div>
            <div className='text-right underline font-medium'>
              <Link href="#myAI">
                {t('seemore')}
              </Link>
            </div>
          </div>
          <div className='border-2 border-custom-black rounded-lg shadow-xl bg-white w-1/4 h-48 py-3 px-5 flex flex-col justify-start gap-2'>
            <p className='text-custom-black font-medium text-lg h-3/6 min-h-20'>
              {t('url-measure')}
            </p>
            <div className='text-center text-5xl font-bold'>100%</div>
            <div className='text-right underline font-medium'>
              <Link href="#myURL">
                {t('seemore')}
              </Link>
            </div>
          </div>
          <div className='border-2 border-custom-black rounded-lg shadow-xl bg-white w-1/4 h-48 py-3 px-5 flex flex-col justify-start gap-2'>
            <p className='text-custom-black font-medium text-lg h-3/6 min-h-20'>
              {t('found-other-database')}
            </p>
            <div className='text-center text-5xl font-bold'>100%</div>
            <div className='text-right underline font-medium'>
              <Link href="#myAPI">
                {t('seemore')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RiskMeasurement
