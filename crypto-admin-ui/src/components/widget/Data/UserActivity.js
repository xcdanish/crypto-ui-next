// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';

// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

const UserActivity = () => {
  const iconSX = {
    fontSize: '0.875rem',
    marginRight: 0.2,
    verticalAlign: 'sub'
  };

  return (
    <MainCard title="User Activity" content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: 'success.main', fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar1} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="subtitle1">John Deo</Typography>
                <Typography variant="subtitle2">Lorem Ipsum is simply dummy text.</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: 'error.main', fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar2} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="subtitle1">John Deo</Typography>
                <Typography variant="subtitle2">Lorem Ipsum is simply dummy text.</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: 'warning.main', fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar3} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="subtitle1">John Deo</Typography>
                <Typography variant="subtitle2">Lorem Ipsum is simply dummy text.</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: 'success.main', fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar1} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="subtitle1">John Deo</Typography>
                <Typography variant="subtitle2">Lorem Ipsum is simply dummy text.</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" size="small">
          View all Projects
        </Button>
      </CardActions>
    </MainCard>
  );
};

export default UserActivity;
