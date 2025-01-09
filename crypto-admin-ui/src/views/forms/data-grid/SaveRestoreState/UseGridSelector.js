'use client';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DataGrid, gridPageSelector, gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import CardSecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import CSVExport from 'views/forms/tables/tbl-exports';

// pagination toolbar
function Toolbar() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      sx={(theme) => ({ padding: theme.spacing(1.5, 0) })}
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

// ==============================|| USE GRID SELECTOR DATA GRID ||============================== //

export default function UseGridSelector() {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 8
  });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });

  const headers = [];
  data.columns.map((item) => headers.push({ label: item.headerName, key: item.field }));

  return (
    <MainCard
      content={false}
      title="With useGridSelector"
      secondary={
        <Stack direction="row" spacing={2} alignItems="center">
          <CSVExport data={data.rows} filename="use-grid-selector-data-grid-table.csv" header={headers} />
          <CardSecondaryAction link="https://mui.com/x/react-data-grid/state/#with-usegridselector" />
        </Stack>
      }
    >
      <Box sx={{ width: '100%' }}>
        <DataGrid
          {...data}
          loading={loading}
          autoHeight
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          hideFooter
          slots={{ toolbar: Toolbar }}
        />
      </Box>
    </MainCard>
  );
}
