import React from 'react'
import { useScopedI18n } from '@/locales/client';
import { CategoryLabelProps } from '@/lib/interface/verification/interface';

const CategoryLabel: React.FC<CategoryLabelProps> = ({ label, currentPercent }) => {
  const t = useScopedI18n('verificationpage')
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mt-2 text-3xl font-bold'>{label}</div>
      <div className='text-md text-gray-600'>
        {t('update')} {currentPercent}%
      </div>
    </div>
  );
}

export default CategoryLabel
