import { useScopedI18n } from '@/locales/client';
import React from 'react'
import TableDatabaseHeader from './TableDatabaseHeader';
import TableDatabaseBody from './TableDatabaseBody';
import { TableDatabaseProps } from '@/lib/interface/moredetail/interface';

const TableDatabase: React.FC<TableDatabaseProps> = ({ data, checkIPQuality, checkURLHaus }) => {
  const t = useScopedI18n('moredetailpage');

  return (
    <>
      <table className='min-w-full'>
        <TableDatabaseHeader />
        <TableDatabaseBody data={data} checkIPQuality={checkIPQuality} checkURLHaus={checkURLHaus} />
      </table>
    </>
  );
};

export default TableDatabase
