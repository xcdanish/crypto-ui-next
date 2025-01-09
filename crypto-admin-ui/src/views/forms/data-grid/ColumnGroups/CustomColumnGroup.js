'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { DataGrid } from '@mui/x-data-grid';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import CardSecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import CSVExport from 'views/forms/tables/tbl-exports';
import { ThemeMode } from 'config';

// assets
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';

// table data
const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    minWidth: 150
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
    minWidth: 150
  },
  {
    field: 'age',
    headerName: 'Age',
    flex: 0.5,
    minWidth: 124
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

function HeaderWithIcon(props) {
  const { icon, ...params } = props;

  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        '& span': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mr: 0.5
        }
      }}
    >
      <span>{params.headerName ?? params.groupId}</span> {icon}
    </Box>
  );
}

HeaderWithIcon.propTypes = {
  icon: PropTypes.object,
  params: PropTypes.array
};

const columnGroupingModel = [
  {
    groupId: 'internal_data',
    headerName: 'Internal',
    description: '',
    renderHeaderGroup: (params) => <HeaderWithIcon {...params} icon={<BuildIcon color="disabled" sx={{ fontSize: 16 }} />} />,
    children: [{ field: 'id' }]
  },
  {
    groupId: 'character',
    description: 'Information about the character',
    headerName: 'Basic info',
    renderHeaderGroup: (params) => <HeaderWithIcon {...params} icon={<PersonIcon color="disabled" sx={{ fontSize: 16 }} />} />,
    children: [
      {
        groupId: 'naming',
        headerName: 'Names',
        headerClassName: 'my-super-theme--naming-group',
        children: [{ field: 'lastName' }, { field: 'firstName' }]
      },
      { field: 'age' }
    ]
  }
];

function CustomizationDemo({ Selected }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        '& .my-super-theme--naming-group': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.light'
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        experimentalFeatures={{ columnGrouping: true }}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        onRowSelectionModelChange={(newSelectionModel) => {
          const selectedIDs = new Set(newSelectionModel);
          const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
          Selected(selectedRowData);
        }}
        columnGroupingModel={columnGroupingModel}
      />
    </Box>
  );
}

CustomizationDemo.propTypes = {
  Selected: PropTypes.func
};

// ==============================|| CUSTOM COLUMN GROUP DATA GRID ||============================== //

export default function Customization() {
  const headers = [];
  columns.map((item) => headers.push({ label: item.headerName, key: item.field }));

  const [selectedValue, setSelectedValue] = useState([]);
  const handlerClick = (data) => {
    setSelectedValue(data);
  };

  const NewValue = selectedValue.length > 0 ? selectedValue : rows;

  return (
    <MainCard
      content={false}
      title="Custom Column Group"
      secondary={
        <Stack direction="row" spacing={2} alignItems="center">
          <CSVExport data={NewValue} filename="custom-group-data-grid-table.csv" header={headers} />
          <CardSecondaryAction link="https://mui.com/x/react-data-grid/column-groups/#customize-column-group" />
        </Stack>
      }
    >
      <CustomizationDemo Selected={handlerClick} />
    </MainCard>
  );
}
