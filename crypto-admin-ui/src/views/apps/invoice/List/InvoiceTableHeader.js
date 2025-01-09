import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// table header options
const headCells = [
  {
    id: 'date',
    numeric: true,
    label: 'Issue Date'
  },
  {
    id: 'id',
    numeric: true,
    label: 'Invoice No',
    align: 'center'
  },
  {
    id: 'name',
    numeric: false,
    label: 'Customer Info'
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status'
  },
  {
    id: 'date',
    numeric: true,
    label: 'Due Date'
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Due Amount',
    align: 'right'
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Balance',
    align: 'right'
  },
  {
    id: 'payment',
    numeric: true,
    label: 'Payment',
    align: 'right'
  }
];

// ==============================|| INVOICE LIST - TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar sx={{ p: 0, pl: 1, pr: 1, ...(numSelected > 0 && { color: 'secondary.main' }) }}>
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

// ==============================|| INVOICE LIST - HEADER ||============================== //

const InvoiceTableHeader = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected }) => {
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
          <TableCell padding="none" colSpan={12}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell, index) => {
            const isActive = orderBy === headCell.id;
            return (
              <TableCell
                key={index}
                align={headCell.align}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={isActive ? order : undefined}
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
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

InvoiceTableHeader.propTypes = {
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default InvoiceTableHeader;
