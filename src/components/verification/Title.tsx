import { useScopedI18n } from '@/locales/client'
import React from 'react'

const Title = () => {
  const t = useScopedI18n('verificationpage')

  return (
    <div>
      <h1
        className={`text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3] relative`}
      >
        {t('title')}
      </h1>
    </div>
  );
}

export default Title
