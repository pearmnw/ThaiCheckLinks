'use client';
import React, { useState } from 'react';

const WebsiteData: React.FC = () => {
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
          Website Data
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
            <p className='text-gray-700 block px-4 py-2 text-sm'>Alexa rank:</p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>Meta title:</p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Meta description:
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>IP address:</p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Status code:
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>Domain age:</p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>SSL valid:</p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>SSL type:</p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              WHOIS register date:
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              WHOIS last update date:
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              WHOIS renew date:
            </p>
            <p className='text-gray-700 block px-4 py-2 text-sm'>
              Redirected domain:
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteData;
