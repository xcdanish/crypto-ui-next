'use  client';

import PropTypes from 'prop-types';
import * as React from 'react';
import Link from 'next/link';

// material-ui
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

// assets
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import AddIcon from '@mui/icons-material/AddTwoTone';

// ==============================|| PAYMENT LIST - FILTER ||============================== //

const PaymentFilter = ({ row, setRows }) => {
  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = row?.filter((row) => {
        let matches = true;

        const properties = ['id', 'name', 'date', 'company', 'status', 'type', 'qty'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(row);
    }
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }} alignItems="center" justifyContent="space-between" spacing={2}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )
        }}
        onChange={handleSearch}
        placeholder="Search Payment"
        value={search}
        size="small"
        sx={{ width: { xs: 1, sm: 'auto' } }}
      />
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Tooltip title="Copy">
          <IconButton size="large">
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton size="large">
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter">
          <IconButton size="large">
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        {/* payment add & dialog */}
        <Tooltip title="Add Payment">
          <Fab
            color="primary"
            size="small"
            component={Link}
            href="/apps/invoice/payment/add-payment"
            sx={{ boxShadow: 'none', width: 32, height: 32, minHeight: 32 }}
          >
            <AddIcon fontSize="small" />
          </Fab>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

PaymentFilter.propTypes = {
  row: PropTypes.array,
  setRows: PropTypes.func
};

export default PaymentFilter;
