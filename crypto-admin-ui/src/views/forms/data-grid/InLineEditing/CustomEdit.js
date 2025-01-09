'use client';

import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import CardSecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import CSVExport from 'views/forms/tables/tbl-exports';

function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

function RatingEditInputCell(props) {
  const { id, value, field, hasFocus } = props;
  const apiRef = useGridApiContext();
  const ref = React.useRef();

  const handleChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  useEnhancedEffect(() => {
    if (hasFocus && ref.current) {
      const input = ref.current.querySelector(`input[value="${value}"]`);
      input?.focus();
    }
  }, [hasFocus, value]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
      <Rating ref={ref} name="rating" precision={1} value={value} onChange={handleChange} />
    </Box>
  );
}

RatingEditInputCell.propTypes = {
  id: PropTypes.number,
  value: PropTypes.array,
  field: PropTypes.bool,
  hasFocus: PropTypes.bool
};

const renderRatingEditInputCell = (params) => <RatingEditInputCell {...params} />;

const columns = [
  {
    field: 'places',
    headerName: 'Places',
    flex: 0.75,
    minWidth: 120
  },
  {
    field: 'rating',
    headerName: 'Rating',
    renderCell: renderRating,
    renderEditCell: renderRatingEditInputCell,
    editable: true,
    flex: 1,
    minWidth: 120
  }
];

const rows = [
  { id: 1, places: 'Barcelona', rating: 5 },
  { id: 2, places: 'Rio de Janeiro', rating: 4 },
  { id: 3, places: 'London', rating: 3 },
  { id: 4, places: 'New York', rating: 2 }
];

// ==============================|| CUSTOM EDIT DATA GRID ||============================== //

export default function CustomEditComponent() {
  const headers = [];
  columns.map((item) => headers.push({ label: item.headerName, key: item.field }));

  return (
    <MainCard
      content={false}
      title="Customize Editing"
      secondary={
        <Stack direction="row" spacing={2} alignItems="center">
          <CSVExport data={rows} filename="custom-edit-data-grid-table.csv" header={headers} />
          <CardSecondaryAction link="https://mui.com/x/react-data-grid/editing/#create-your-own-edit-component" />
        </Stack>
      }
    >
      <Box sx={{ width: '100%' }}>
        <DataGrid hideFooter autoHeight rows={rows} columns={columns} />
      </Box>
    </MainCard>
  );
}
