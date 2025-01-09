import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// project-import
import ControlPanelStyled from 'components/ui-component/third-party/map/ControlPanelStyled';

// ==============================|| SIDE BY SIDE - CONTROL ||============================== //

const ControlPanel = ({ mode, onModeChange }) => (
  <ControlPanelStyled>
    <ToggleButtonGroup value={mode} exclusive onChange={onModeChange}>
      <ToggleButton value="side-by-side">Side by side</ToggleButton>
      <ToggleButton value="split-screen">Split screen</ToggleButton>
    </ToggleButtonGroup>
  </ControlPanelStyled>
);

ControlPanel.propTypes = {
  mode: PropTypes.string,
  onModeChange: PropTypes.func
};

export default memo(ControlPanel);
