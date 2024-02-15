import { useScopedI18n } from '@/locales/client';
import React from 'react'
import TableDatabaseHeader from './TableDatabaseHeader';
import TableDatabaseBody from './TableDatabaseBody';
import { TableDatabaseProps } from '@/lib/interface/moredetail/interface';

const TableDatabase = () => {
  const t = useScopedI18n('verificationpage');

  return (
    <>
      <table className='min-w-full'>
        <TableDatabaseHeader />
        <TableDatabaseBody />
      </table>
    </>
  );
};

export default TableDatabase
