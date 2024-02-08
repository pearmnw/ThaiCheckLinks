import { CheckedProps } from '@/lib/interface/moredetail/interface';
import React from 'react'

const Checked: React.FC<CheckedProps> = ({ shown }) => {
  return (
    <>
      <svg
        className={`w-7 h-7 border-2 ${shown ? 'border-green-600' : 'border-gray-600'} rounded-full`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M5 13l4 4L19 7'
        />
      </svg>
    </>
  );
}

export default Checked
