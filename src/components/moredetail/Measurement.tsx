'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';

const Measurement = () => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();

  return (
    <div className='text-custom-black bg-custom-bg-moredetail flex flex-center items-start flex-col rounded-xl w-full py-8 px-20 text-3xl'>
      {t('measurement')}
      {/* // TODO: MEASURE POSITIVE AND NEGATIVE TABLE */}
    </div>
  );
};

export default Measurement;
