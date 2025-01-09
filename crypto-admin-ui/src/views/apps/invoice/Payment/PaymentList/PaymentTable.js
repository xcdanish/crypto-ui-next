'use client';

import PropTypes from 'prop-types';
import * as React from 'react';
import Link from 'next/link';

// material-ui
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { random } from 'lodash-es';

// project imports
import PaymentTableHeader from './PaymentTableHeader';
import Avatar from 'components/ui-component/extended/Avatar';

// assets
import CancelIcon from '@mui/icons-material/Cancel';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const avatarImage = '/assets/images/users';

// table sort
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: 'relative'
}));

// ==============================|| PAYMENT LIST - TABLE ||============================== //

const PaymentTable = ({ rows }) => {
  let icon;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        const newSelectedId = rows.map((n) => n.name);
        setSelected(newSelectedId);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // eslint-disable-next-line
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Main>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <PaymentTableHeader
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            selected={selected}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                /** Make sure no display bugs if row isn't an OrderData object */
                if (typeof row === 'number') return null;

                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const avatarProfile = `${avatarImage}/avatar-${Math.floor(Math.random() * 9) + 1}.png`;

                switch (row.status.toString()) {
                  case '1':
                    icon = <CheckCircleIcon color="success" fontSize="small" />;
                    break;
                  case '3':
                    icon = <CancelIcon color="error" fontSize="small" />;
                    break;
                  case '2':
                  default:
                    icon = <TimelapseIcon color="warning" fontSize="small" />;
                    break;
                }

                const payDate = new Date(new Date().getTime() - random(0, 28) * 24 * 60 * 60 * 1000);
                const dueDate = new Date(new Date().getTime() + random(0, 28) * 24 * 60 * 60 * 1000);

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                    <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.name)}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={(event) => handleClick(event, row.name)} sx={{ cursor: 'pointer' }}>
                      <Typography variant="h5">#{row.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>10.12.2020</Typography>
                    </TableCell>
                    <TableCell onClick={(event) => handleClick(event, row.name)} sx={{ cursor: 'pointer' }}>
                      <Grid container spacing={1.25} alignItems="center">
                        <Grid item>
                          <Avatar alt="User 1" src={avatarProfile} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Typography variant="h5" noWrap>
                              {row.name}
                            </Typography>
                            {icon}
                          </Stack>
                          <Typography variant="subtitle2">{row.company}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell sortDirection={false}>{`${payDate.getDate()}-${payDate.getMonth() + 1}-${payDate.getFullYear()}`}</TableCell>
                    <TableCell sortDirection={false}>{`${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`}</TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">2.5%</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">£{row.qty} </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                        <Tooltip title="View">
                          <IconButton
                            color="primary"
                            size="small"
                            aria-label="View"
                            {...{ component: Link, href: '/apps/invoice/payment/payment-details' }}
                          >
                            <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton color="secondary" size="small" aria-label="Edit">
                            <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" size="small" aria-label="Delete">
                            <DeleteTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow sx={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Main>
  );
};

PaymentTable.propTypes = {
  rows: PropTypes.array
};

export default PaymentTable;
