import React from 'react'
import { CrossProps } from '@/lib/interface/moredetail/interface';

const Cross: React.FC<CrossProps> = ({ shown }) => {
  return (
    <>
      <svg
        className={`w-7 h-7 border-2 ${shown === false ? 'border-red-600' : 'border-gray-600'} rounded-full`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </>
  );
}

export default Cross
