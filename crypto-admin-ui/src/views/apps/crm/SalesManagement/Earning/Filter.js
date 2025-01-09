import PropTypes from 'prop-types';
import { useState } from 'react';

// mui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

// project import
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';

// ==============================|| EARNING - FILTER ||============================== //

const Filter = ({ rows, setRows }) => {
  const { mode, borderRadius } = useConfig();

  const [selectValue, setSelectValue] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows?.filter((row) => {
        let matches = true;
        const properties = ['date', 'id', 'name', 'qty'];
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

  const handleChangeMonth = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <Stack
      sx={{ p: 3 }}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )
        }}
        onChange={handleSearch}
        value={search}
        placeholder="Search Earning"
        size="small"
        sx={{ width: { xs: 1, sm: 'auto' } }}
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ justifyContent: 'space-between', width: { xs: '100%', sm: 'auto' } }}
        spacing={1.25}
      >
        <Stack justifyContent="center" direction="row" spacing={1.25}>
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
        </Stack>
        <Stack justifyContent="space-between" direction="row" alignItems="center" spacing={1.25}>
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Select Request</InputLabel>
            <Select
              sx={{ width: 147 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChangeMonth}
              value={selectValue}
              label="Select Request"
            >
              <MenuItem value={1}>Open request</MenuItem>
              <MenuItem value={2}>Close request</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Button
              size="large"
              variant="outlined"
              sx={{
                borderRadius: `${borderRadius}px`,
                color: 'grey.900',
                width: { sm: 147 },
                borderColor: mode === ThemeMode.DARK ? 'divider' : 'grey.300',
                bgcolor: 'backgpund.default',
                '&:hover': {
                  borderColor: mode === ThemeMode.DARK ? 'grey.800' : 'grey.500'
                }
              }}
              endIcon={<OpenInNewOutlinedIcon sx={{ color: 'grey.500' }} />}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

Filter.propTypes = {
  rows: PropTypes.array,
  setRows: PropTypes.func
};

export default Filter;
