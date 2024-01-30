'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import Link from 'next/link';

const Header = () => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();

  return (
    <div className='flex justify-start item-center text-custom-black text-4xl font-bold gap-5'>
      <Link
        href='/verification'
        className='flex justify-center items-center text-3xl font-extrabold bg-custom-black rounded-full text-white w-10 h-10 cursor-pointer'
      >
        {'<'}
      </Link>
      {t('title')}
    </div>
  );
};

export default Header;
