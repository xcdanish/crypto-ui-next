'use client';

import PropTypes from 'prop-types';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { CSVLink } from 'react-csv';

// assets
import { IconDeviceFloppy } from '@tabler/icons-react';

// ==============================|| CSV Export ||============================== //

const CSVExport = ({ data, filename, headers }) => (
  <Tooltip title="CSV Export" placement="left">
    <ButtonBase sx={{ mt: 0.5, '& svg': { color: 'secondary.main' } }}>
      <CSVLink data={data} filename={filename} headers={headers}>
        <IconDeviceFloppy aria-label="Export CSV File" />
      </CSVLink>
    </ButtonBase>
  </Tooltip>
);

CSVExport.propTypes = {
  data: PropTypes.array,
  filename: PropTypes.string,
  headers: PropTypes.string
};

export default CSVExport;
