'use client';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import CardSecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import CSVExport from 'views/forms/tables/tbl-exports';

// ==============================|| DISABLE MENU DATA GRID ||============================== //

export default function DisableColumnMenu() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 8
  });

  const headers = [];
  data.columns.map((item) => headers.push({ label: item.headerName, key: item.field }));

  return (
    <MainCard
      content={false}
      title="Disable Column Menu"
      secondary={
        <Stack direction="row" spacing={2} alignItems="center">
          <CSVExport data={data.rows} filename="disable-menu-data-grid-table.csv" header={headers} />
          <CardSecondaryAction link="https://mui.com/x/react-data-grid/column-menu/#disable-column-menu" />
        </Stack>
      }
    >
      <Box sx={{ width: '100%' }}>
        <DataGrid autoHeight hideFooter {...data} disableColumnMenu />
      </Box>
    </MainCard>
  );
}
