import PropTypes from 'prop-types';
import React from 'react';

// mui
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

// assets
import AddIcon from '@mui/icons-material/AddTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';

// ==============================|| HISTORY - FILTER ||============================== //

const Filter = ({ rows, setRows }) => {
  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows?.filter((row) => {
        let matches = true;
        const properties = ['name', 'company', 'date', 'status', 'qty'];
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
      setRows(rows);
    }
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ p: 3 }} spacing={2}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )
        }}
        placeholder="Search History"
        size="small"
        value={search}
        onChange={handleSearch}
      />
      <Stack direction="row" alignItems="center" justifyContent={{ xs: 'center' }} spacing={1.25}>
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
        <Tooltip title="Add New History">
          <Fab color="primary" size="small" sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
            <AddIcon fontSize="small" />
          </Fab>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

Filter.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func
};

export default Filter;
