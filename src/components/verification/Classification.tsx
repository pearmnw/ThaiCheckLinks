import React from 'react'
import Classify from './textcontent/Classify';
import Url from './textcontent/Url';
import { ClassificationProps } from '@/lib/interface/verification/interface';
import Report from './Report';

const Classification: React.FC<ClassificationProps> = ({ urlPercent, currentPercent, maxPercent }) => {
  return (
    <section className=' border-custom-black border-b-2 px-8 py-8' id="myAI">
      {/* <Url urlPercent={urlPercent} /> */}
      <Classify currentPercent={currentPercent} maxPercent={maxPercent} />
    </section>
  );
}

export default Classification
