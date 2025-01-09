import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import FilterLeadList from './FilterLeadList';
import Chip from 'components/ui-component/extended/Chip';

// assets
import CloseIcon from '@mui/icons-material/Close';

// ==============================|| LEAD - FILTER DRAWER ||============================== //

const LeadDrawer = ({ open, handleToggleDrawer }) => (
  <Drawer
    sx={{
      flexShrink: 0,
      zIndex: 100,
      display: open ? 'block' : 'none',
      '& .MuiDrawer-paper': {
        position: { xs: 'fixed', sm: 'relative' },
        overflow: 'auto',
        width: '100%'
      }
    }}
    variant="persistent"
    anchor="right"
    open={open}
  >
    <Box sx={{ px: 2.5, py: 1.5 }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Typography variant="h5">Filter</Typography>
            <Chip label="2" variant="outlined" size="small" onDelete={() => console.log('You clicked the delete icon.')} />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
            <Button variant="outlined" size="small" onClick={handleToggleDrawer} sx={{ borderRadius: 1.5 }} color="primary">
              Save
            </Button>
            <IconButton size="small" onClick={handleToggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
    <Divider />
    <FilterLeadList {...{ handleToggleDrawer }} />
  </Drawer>
);

LeadDrawer.propTypes = {
  open: PropTypes.bool,
  handleToggleDrawer: PropTypes.func
};

export default LeadDrawer;
