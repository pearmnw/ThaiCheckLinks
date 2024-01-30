import React from 'react'
import Classify from './textcontent/Classify';
import Redirected from './Redirected';
import Url from './textcontent/Url';
import { ClassificationProps } from '@/lib/interface/verification/interface';

const Classification: React.FC<ClassificationProps> = ({ urlPercent, currentPercent, maxPercent }) => {
  return (
    <div className='flex flex-col border-solid border-2 mx-28 my-8 border-slate-600 rounded-lg gap-8 py-4'>
      <Url urlPercent={urlPercent} />
      <Classify
        currentPercent={currentPercent}
        maxPercent={maxPercent}
      />
      <Redirected />
    </div>
  );
}

export default Classification
