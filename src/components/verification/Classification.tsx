import React from 'react'
import Classify from './textcontent/Classify';
import Url from './textcontent/Url';
import { ClassificationProps } from '@/lib/interface/verification/interface';
import Report from './Report';

const Classification = () => {
  return (
    <section className=' border-custom-black border-b-2 px-8 py-8' id="myAI">
      <Classify />
    </section>
  );
}

export default Classification
