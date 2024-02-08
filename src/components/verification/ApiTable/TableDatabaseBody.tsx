import { useScopedI18n } from '@/locales/client'
import React from 'react'
import { TableDatabaseBodyProps } from '@/lib/interface/moredetail/interface';

const TableDatabaseBody: React.FC<TableDatabaseBodyProps> = ({ data, checkIPQuality, checkURLHaus }) => {
  const t = useScopedI18n('moredetailpage');

  return (
    <>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr
            key={index}
            className={index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className='px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 text-start border-r-4 border-custom-black'>
              {item.name}
            </td>
            {checkIPQuality !== 'No Result' && checkURLHaus !== 'No Result' ? (
              <td
                className={`px-6 py-4 whitespace-nowrap text-3xl ${
                  item.status === ('FOUND' || 'ค้นพบ')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.status}
              </td>
            ) : (
              <td className='px-6 py-4 whitespace-nowrap text-3xl text-custom-black'>
                {item.status}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableDatabaseBody
