import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { visuallyHidden } from '@mui/utils';

// table header options
const headCells = [
  {
    id: 'id',
    numeric: true,
    label: 'Item ID'
  },
  {
    id: 'name',
    numeric: false,
    label: 'Item Info'
  },
  {
    id: 'unit',
    numeric: true,
    label: 'Unit',
    align: 'right'
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Quantity',
    align: 'right'
  },
  {
    id: 'qty',
    numeric: true,
    label: 'Price',
    align: 'right'
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status'
  },
  {
    id: 'action',
    numeric: false,
    label: 'Actions',
    align: 'center'
  }
];

// ==============================|| ITEM TABLE - HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 1,
      pr: 1,
      ...(numSelected > 0 && {
        color: (theme) => theme.palette.secondary.main
      })
    }}
  >
    {numSelected > 0 ? (
      <Typography color="inherit" variant="h4">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} />
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

// ==============================|| ITEM TABLE - HEADER ||============================== //

const ItemTableHeader = ({ open, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3, ...(open && { display: 'none' }) }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={12}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => {
            const isActive = orderBy === headCell.id;
            return (
              <TableCell
                key={headCell.id}
                align={headCell.align}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={isActive ? order : undefined}
                {...(open && { sx: { display: 'none' } })}
              >
                <TableSortLabel active={isActive} direction={isActive ? order : undefined} onClick={createSortHandler(headCell.id)}>
                  {headCell.label}
                  {isActive && (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  )}
                </TableSortLabel>
              </TableCell>
            );
          })}
      </TableRow>
    </TableHead>
  );
};

ItemTableHeader.propTypes = {
  open: PropTypes.bool,
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default ItemTableHeader;
