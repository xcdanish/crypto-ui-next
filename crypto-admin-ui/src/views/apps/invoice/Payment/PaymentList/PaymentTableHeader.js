import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { visuallyHidden } from '@mui/utils';

// assets
import DeleteIcon from '@mui/icons-material/Delete';

// table header options
const headCells = [
  {
    id: 'id',
    numeric: true,
    label: ' Receipt ID'
  },
  {
    id: 'date',
    numeric: false,
    label: ' Issue Date'
  },
  {
    id: 'name',
    numeric: false,
    label: 'Account Name'
  },
  {
    id: 'number',
    numeric: false,
    label: 'Date of Payment'
  },
  {
    id: 'number',
    numeric: false,
    label: 'Due Date'
  },
  {
    id: 'value',
    numeric: false,
    label: 'Tax',
    align: 'right'
  },
  {
    id: 'qty1',
    numeric: false,
    label: 'Balance',
    align: 'right'
  }
];

// ==============================|| PAYMENT LIST - TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar sx={{ p: 0, px: 1, ...(numSelected > 0 && { color: 'secondary.main' }) }}>
    {numSelected > 0 ? (
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
        <Typography color="inherit" variant="h4">
          {numSelected} Selected
        </Typography>
        <Tooltip title="Delete">
          <IconButton size="large">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ) : (
      <Typography variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

// ==============================|| PAYMENT LIST - HEADER ||============================== //

const PaymentTableHeader = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
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
          <TableCell padding="none" colSpan={8}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell, index) => (
            <TableCell
              key={index}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : undefined}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : undefined}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

PaymentTableHeader.propTypes = {
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default PaymentTableHeader;
