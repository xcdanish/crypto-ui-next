import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from 'components/ui-component/extended/Avatar';
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import TwitterIcon from '@mui/icons-material/Twitter';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

// ==========================|| DATA WIDGET - LATEST MESSAGES CARD ||========================== //

const LatestMessages = () => (
  <MainCard title="Messages" content={false}>
    <CardContent>
      <Grid
        container
        spacing={gridSpacing}
        alignItems="center"
        sx={{
          position: 'relative',
          '&>*': {
            position: 'relative',
            zIndex: '5'
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: 110,
            width: '1px',
            height: '100%',
            bgcolor: 'divider',
            zIndex: '1'
          }
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography variant="caption">2 hrs ago</Typography>
                </Grid>
                <Grid item>
                  <Avatar color="info">
                    <TwitterIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">+ 1652 Followers</Typography>
                  <Typography variant="subtitle2">You’re getting more and more followers, keep it up!</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography variant="caption">4 hrs ago</Typography>
                </Grid>
                <Grid item>
                  <Avatar color="error">
                    <BusinessCenterTwoToneIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">+ 5 New Products were added!</Typography>
                  <Typography variant="subtitle2">Congratulations!</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography variant="caption">1 day ago</Typography>
                </Grid>
                <Grid item>
                  <Avatar color="success">
                    <DoneAllTwoToneIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Database backup completed!</Typography>
                  <Typography variant="subtitle2">
                    Download the{' '}
                    <MuiLink component={Link} href="#" underline="hover">
                      latest backup
                    </MuiLink>
                    .
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                  <Typography variant="caption">2 day ago</Typography>
                </Grid>
                <Grid item>
                  <Avatar color="primary">
                    <AccountCircleTwoToneIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">+2 Friend Requests</Typography>
                  <Typography variant="subtitle2">This is great, keep it up!</Typography>
                </Grid>
              </Grid>
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

export default LatestMessages;
