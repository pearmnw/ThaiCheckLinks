import { useScopedI18n } from '@/locales/client'
import React, { useContext } from 'react'
import { VerificationContext } from '../Verification';

const TableDatabaseBody= () => {
  const t = useScopedI18n('verificationpage');
  const { hasAnotherDatabase, riskScoreOverall } = useContext(VerificationContext).overviewScore;

  return (
    <>
      <tbody>
        {hasAnotherDatabase.map((item: any, index: number) => (
          <tr
            key={index}
            className={index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className='px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 text-start border-r-4 border-custom-black'>
              {item.name}
            </td>
            {item.status !== null ? (
              <td
                className={`px-6 py-4 whitespace-nowrap text-3xl text-center ${
                  item.status !== t('FOUND') && riskScoreOverall > 0
                    ? 'text-green-600'
                    : item.status !== t('NOT FOUND') && riskScoreOverall > 0
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {item.status}
              </td>
            ) : (
              <td className='px-6 py-4 whitespace-nowrap text-3xl text-custom-black text-center'>
                {t('No Result')}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableDatabaseBody
