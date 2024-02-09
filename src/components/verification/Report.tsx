import React from 'react'
import ReportHeader from './report/ReportHeader'
import { useScopedI18n } from '@/locales/client'
import ReportRisk from './report/ReportRisk'
import ReportVisualization from './report/ReportVisualization'
import { ReportProps } from '@/lib/interface/verification/interface'

const Report:React.FC<ReportProps> = ({ categoryCount }) => {
  const t = useScopedI18n('verificationpage')

  return (
    <div className='px-8 border-b-2 border-custom-black' id="myReport">
      <ReportHeader />
      <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
        <ReportRisk />
        <ReportVisualization categoryCount={categoryCount} />
      </div>
    </div>
  );
}

export default Report
