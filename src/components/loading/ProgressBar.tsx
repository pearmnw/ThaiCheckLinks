import React from 'react'
import { ProgressBarProps } from '@/lib/interface/verification/interface';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div>
      <div className='w-64 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
        <div
          className='bg-blue-600 h-2.5 rounded-full'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};


export default ProgressBar
