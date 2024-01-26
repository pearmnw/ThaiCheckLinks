'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import MDHeader from './Header';
import MDTrustscore from './Trustscore';
import MDMeasurement from './Measurement';
import MDWebsiteInsight from './WebsiteInsight';
import MDAPI from './API';


interface MoredetailProps {
  url: string;
}

const Moredetail: React.FC<MoredetailProps> = ({ url }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();

  return (
    <>
      <div className='flex justify-center flex-col border-solid border-2 mx-28 my-8 border-slate-600 rounded-lg py-14 px-8 gap-6'>
        <MDHeader />
        <div className='flex justify-center flex-col item-center mx-12 gap-6'>
          <MDTrustscore url={url}/>
          <MDMeasurement />
          <MDWebsiteInsight url={url}/>
          <MDAPI url={url}/>
        </div>
      </div>
    </>
  );
};

export default Moredetail;
