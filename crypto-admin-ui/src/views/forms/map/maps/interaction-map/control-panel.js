import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// project-import
import ControlPanelStyled from 'components/ui-component/third-party/map/ControlPanelStyled';

const camelPattern = /(^|[A-Z])[a-z]*/g;

function formatSettingName(name) {
  return name.match(camelPattern)?.join(' ');
}

// ==============================|| CONTROL - INTERATION MAP ||============================== //

function ControlPanel({ settings, onChange }) {
  const renderSetting = (name, value) => {
    switch (typeof value) {
      case 'boolean':
        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0.75}
            key={name}
            sx={{ textTransform: 'capitalize', '&:not(:last-of-type)': { mb: 1 } }}
          >
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <Switch size="small" checked={value} onChange={(event) => onChange(name, event.target.checked)} />
          </Stack>
        );
      case 'number':
        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0.75}
            key={name}
            sx={{ textTransform: 'capitalize', '&:not(:last-of-type)': { mb: 1 } }}
          >
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <InputBase
              value={value}
              onChange={(event) => onChange(name, Number(event.target.value))}
              inputProps={{ type: 'number' }}
              sx={{
                '& input': {
                  py: 0.25,
                  width: 40,
                  fontSize: 14,
                  borderRadius: 1,
                  textAlign: 'center',
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
                }
              }}
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  return <ControlPanelStyled>{Object.keys(settings).map((name) => renderSetting(name, settings[name]))}</ControlPanelStyled>;
}

ControlPanel.propTypes = {
  settings: PropTypes.object,
  onChange: PropTypes.func
};

export default memo(ControlPanel);
