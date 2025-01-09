'use client';

import React from 'react';

// material-ui
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Switch from '@mui/material/Switch';

// assets
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import ShareIcon from '@mui/icons-material/ShareTwoTone';
import FavoriteIcon from '@mui/icons-material/FavoriteTwoTone';

// =============================|| UI SPEEDDIAL - SIMPLE ||============================= //

export default function SimpleSpeedDials() {
  const [open, setOpen] = React.useState(false);

  // fab action options
  const actions = [
    { icon: <FileCopyIcon sx={{ color: 'grey700' }} />, name: 'Save' },
    { icon: <PrintIcon sx={{ color: 'grey700' }} />, name: 'Print' },
    { icon: <ShareIcon sx={{ color: 'grey700' }} />, name: 'Share' },
    { icon: <FavoriteIcon sx={{ color: 'grey700' }} />, name: 'Like' }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [direction, setDirection] = React.useState('up');
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const [hidden, setHidden] = React.useState(false);
  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />} label="Hidden" />
      <FormLabel component="legend">Direction</FormLabel>
      <RadioGroup sx={{ mt: 1 }} aria-label="direction" name="direction" value={direction} onChange={handleDirectionChange} row>
        <FormControlLabel value="up" control={<Radio />} label="Up" />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <FormControlLabel value="right" control={<Radio />} label="Right" />
        </Box>
        <FormControlLabel value="down" control={<Radio />} label="Down" />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <FormControlLabel value="left" control={<Radio />} label="Left" />
        </Box>
      </RadioGroup>
      <Box sx={{ position: 'relative', mt: 3, height: 300 }}>
        <SpeedDial
          sx={{
            position: 'absolute',
            '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': { bottom: 16, right: 16 },
            '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': { top: 16, left: 16 }
          }}
          ariaLabel="SpeedDial example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
}
