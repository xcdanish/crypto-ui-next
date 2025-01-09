'use client';

import { useEffect, useState } from 'react';

// material-ui
import CardContent from '@mui/material/CardContent';

// project imports
import InvoiceFilter from './InvoiceFilter';
import InvoiceTable from './InvoiceTable';
import MainCard from 'components/ui-component/cards/MainCard';

import { dispatch, useSelector } from 'store';
import { getInvoice } from 'store/slices/customer';

// ==============================|| INVOICE LIST ||============================== //

const InvoiceList = () => {
  const { invoices } = useSelector((state) => state.customer);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getInvoice());
  }, []);

  useEffect(() => {
    setRows(invoices);
  }, [invoices]);

  return (
    <MainCard content={false}>
      {/* filter section */}
      <CardContent>
        <InvoiceFilter {...{ rows: invoices, setRows }} />
      </CardContent>

      {/* table */}
      <InvoiceTable {...{ rows }} />
    </MainCard>
  );
};

export default InvoiceList;
