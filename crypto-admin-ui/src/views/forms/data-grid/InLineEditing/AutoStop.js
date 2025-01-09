'use client';

import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import CardSecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import CSVExport from 'views/forms/tables/tbl-exports';

function SelectEditInputCell({ id, value, field }) {
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select value={value} onChange={handleChange} size="small" sx={{ height: 1 }} native autoFocus>
      <option>Back-end Developer</option>
      <option>Front-end Developer</option>
      <option>UX Designer</option>
    </Select>
  );
}

SelectEditInputCell.propTypes = {
  id: PropTypes.number,
  value: PropTypes.array,
  field: PropTypes.bool
};

const renderSelectEditInputCell = (params) => <SelectEditInputCell {...params} />;

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.75,
    minWidth: 120
  },
  {
    field: 'role',
    headerName: 'Role',
    renderEditCell: renderSelectEditInputCell,
    editable: true,
    flex: 1,
    minWidth: 180
  }
];

const rows = [
  {
    id: 1,
    name: 'Olivier',
    role: 'Back-end Developer'
  },
  {
    id: 2,
    name: 'Danail',
    role: 'UX Designer'
  },
  {
    id: 3,
    name: 'Matheus',
    role: 'Front-end Developer'
  }
];

// ==============================|| AUTO STOP EDIT DATA GRID ||============================== //

export default function AutoStopEditComponent() {
  const headers = [];
  columns.map((item) => headers.push({ label: item.headerName, key: item.field }));
  return (
    <MainCard
      content={false}
      title="With Auto Stop"
      secondary={
        <Stack direction="row" spacing={2} alignItems="center">
          <CSVExport data={rows} filename="auto-stop-edit-data-grid-table.csv" header={headers} />
          <CardSecondaryAction link="https://mui.com/x/react-data-grid/editing/#with-auto-stop" />
        </Stack>
      }
    >
      <Box sx={{ width: '100%' }}>
        <DataGrid hideFooter autoHeight rows={rows} columns={columns} />
      </Box>
    </MainCard>
  );
}
