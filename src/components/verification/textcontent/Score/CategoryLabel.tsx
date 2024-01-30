import React from 'react'
import { useScopedI18n } from '@/locales/client';
import { CategoryLabelProps } from '@/lib/interface/verification/interface';

const CategoryLabel: React.FC<CategoryLabelProps> = ({ label, currentPercent }) => {
  const t = useScopedI18n('verificationpage')
  return (
    <div>
      <div className='mt-2 text-xl font-bold'>{label}</div>
      <div className='text-sm text-gray-600'>
        {t('update')} {currentPercent}%
      </div>
    </div>
  );
}

export default CategoryLabel
