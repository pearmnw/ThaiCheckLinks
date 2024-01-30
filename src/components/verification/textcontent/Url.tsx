'use client';
import { useScopedI18n } from '@/locales/client';
import ScoreIndicator from '../../moredetail/TrustScore/ScoreIndicator';
import { UrlProps } from '@/lib/interface/verification/interface';

const Url: React.FC<UrlProps> = ({ urlPercent }) => {
  const t = useScopedI18n('verificationpage');
  const malicious_url = urlPercent.malicious_proba

  return (
    <div className='flex justify-center flex-col gap-6 w-full py-14 px-12 border-b-2 border-custom-black'>
      <div>{t('malicious-url')}</div>
      <ScoreIndicator score={malicious_url} maxScore={100} />
    </div>
  );
};

export default Url;
