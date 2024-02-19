import React, { useContext } from 'react'
import ReportHeader from './report/ReportHeader'
import { useScopedI18n } from '@/locales/client'
import ReportRisk from './report/ReportRisk'
import ReportVisualization from './report/ReportVisualization'

const Report = () => {
  const t = useScopedI18n('verificationpage')

  return (
    <div className='px-8 border-b-2 border-custom-black' id="myReport">
      <ReportHeader />
      <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
        <ReportRisk />
        <ReportVisualization />
      </div>
    </div>
  );
}

export default Report
