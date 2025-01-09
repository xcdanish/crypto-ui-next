'use client';

import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// project import
import { ThemeMode } from 'config';

// assets
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeftTwoTone';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenterTwoTone';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRightTwoTone';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustifyTwoTone';
import LaptopIcon from '@mui/icons-material/LaptopTwoTone';
import TvIcon from '@mui/icons-material/TvTwoTone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroidTwoTone';

// ============================|| UI TOGGLE BUTTON - NO EMPTY ||============================ //

export default function ToggleButtonNotEmpty() {
  const theme = useTheme();

  const [formats, setFormats] = React.useState(() => ['phone']);
  const handleFormat = (event, newFormats) => {
    if (newFormats.length) {
      setFormats(newFormats);
    }
  };

  const [alignment, setAlignment] = React.useState('left');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12}>
        <div>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{ color: 'success.dark', bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.800' : 'primary.light' }}
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div>
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="device"
            sx={{ color: 'warning.dark', bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.800' : 'primary.light' }}
          >
            <ToggleButton value="laptop" aria-label="laptop">
              <LaptopIcon />
            </ToggleButton>
            <ToggleButton value="tv" aria-label="tv">
              <TvIcon />
            </ToggleButton>
            <ToggleButton value="phone" aria-label="phone">
              <PhoneAndroidIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
}
