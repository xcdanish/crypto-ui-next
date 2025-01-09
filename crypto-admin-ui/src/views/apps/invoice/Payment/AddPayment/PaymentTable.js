'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// project import
import { ThemeMode } from 'config';

// ==============================|| ADD PAYMENT - TABLE ||============================== //

const PaymentTable = ({ formik, row }) => {
  const theme = useTheme();

  const [selected, setSelected] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleTableRow = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeMonth = (e) => {
    setSelectValue(e.target.value);
  };

  let tempReceivedAmount = formik.values.amount || 0;

  return (
    <>
      <Card sx={{ borderRadius: 0 }}>
        <Box sx={{ p: 2, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.200' }}>
          <Grid container alignItems="center" justifyContent="space-between" flexWrap="nowrap">
            <Grid item lg={3}>
              <Typography variant="subtitle1">Unpaid Invoice</Typography>
            </Grid>
            <Grid item lg={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChangeMonth}
                  value={selectValue}
                  label="Select Month"
                >
                  <MenuItem value={1}>Last Month</MenuItem>
                  <MenuItem value={2}>This Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Issue Date</TableCell>
              <TableCell>Invoice No.</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="right">Due Amount</TableCell>
              <TableCell align="right">Payment Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((item, index) => {
              const isItemSelected = isSelected(index);
              const labelId = `enhanced-table-checkbox-${index}`;

              let currentAmount = tempReceivedAmount;
              if (tempReceivedAmount >= item?.quantity) {
                currentAmount = item?.quantity;
                tempReceivedAmount -= item?.quantity;
              } else if (tempReceivedAmount < item.quantity) {
                currentAmount = tempReceivedAmount;
                tempReceivedAmount = 0;
              }

              return (
                <TableRow
                  hover
                  onClick={() => handleTableRow(index)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                  </TableCell>
                  <TableCell>{item?.date}</TableCell>
                  <TableCell>
                    <Typography component={Link} href="/apps/invoice/invoice-list" variant="h5" sx={{ textDecoration: 'none' }}>
                      #{item.invoice_id}
                    </Typography>
                  </TableCell>
                  <TableCell>{item?.due_date}</TableCell>
                  <TableCell align="right">$ {item?.quantity}</TableCell>
                  <TableCell align="right">
                    <TextField type="number" value={currentAmount} />
                  </TableCell>
                </TableRow>
              );
            })}
            {row.length <= 0 && (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  No Invoice / Select Client
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

PaymentTable.propTypes = {
  row: PropTypes.array,
  formik: PropTypes.object
};

export default PaymentTable;
