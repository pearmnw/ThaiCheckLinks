import { getScopedI18n } from "../../../../../locales/server";
import SearchBarMain from "@/components/searchbar/searchbarmain";
import Moredetail from "@/components/moredetail/Moredetail";
import Url from "@/components/url/Url";

export default async function verification() {
  const t = await getScopedI18n("verificationpage");
  const url = 'http://182.116.37.95:50487/i';
  return (
    <>
      <div className='text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3] '>
        {t('title')}
        <div className='flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 '>
          {t('caption')}
        </div>
        <SearchBarMain />
        {/* <Url /> */}
        <Moredetail url={url} />
      </div>
    </>
  );
}
