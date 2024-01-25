'use client';
import React, { useState } from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

interface CompanyDataProps {
  company: any
}

const CompanyData: React.FC<CompanyDataProps> = ({ company }) => {
  const t = useScopedI18n('moredetailpage');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='inline-block text-left w-full'>
      <div>
        <button
          type='button'
          className='flex justify-between items-center w-full h-20 rounded-b-md border border-gray-300 shadow-sm px-4 py-2 bg-custom-black text-2xl font-medium text-white'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          Company Data
          <svg
            className='-mr-1 ml-2 h-8 w-8'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className='origin-top-right right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1' role='none'>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Organization:{' '}
              <span className='font-medium'>{company.organization ? company.organization : t('No Result')}</span>
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Owner: <span className='font-medium'>{company.owner? company.owner : t('No Result')}</span>
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Address:{' '}
              <span className='font-medium'>{company.address ? company.address : t('No Result')}</span>
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Country:{' '}
              <span className='font-medium'>{company.country ? company.country : t('No Result')}</span>
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Email: <span className='font-medium'>{company.email ? company.email : t('No Result')}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyData;