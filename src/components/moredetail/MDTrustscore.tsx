'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';

const MDTrustscore = () => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();

  return (
    <div className="text-custom-black bg-custom-bg-moredetail w-auto flex flex-start rounded-xl py-8 px-20">
      {t('trust-score')}
      {/* // TODO: MEASURE TRUSTSCORE */}
    </div>
  );
};

export default MDTrustscore;
