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
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

// ==============================|| DATA WIDGET - TASKS CARD ||============================== //

const TasksCard = () => (
  <MainCard title="Tasks" content={false}>
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
            top: 0,
            left: 43,
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
              <Avatar color="success" size="sm" sx={{ top: 10 }}>
                <ThumbUpAltOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="caption">8:50</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">You’re getting more and more followers, keep it up!</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar color="primary" size="sm" sx={{ top: 10 }}>
                <QueryBuilderOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="caption">Sat, 5 Mar</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Design mobile Application</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar color="error" size="sm" sx={{ top: 10 }}>
                <BugReportOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="caption">Sun, 17 Feb</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <MuiLink component={Link} href="#" underline="hover">
                      Jenny
                    </MuiLink>{' '}
                    assign you a task{' '}
                    <MuiLink component={Link} href="#" underline="hover">
                      Mockup Design
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
              <Avatar color="warning" size="sm" sx={{ top: 10 }}>
                <ErrorOutlineOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="caption">Sat, 18 Mar</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Design logo</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar color="success" size="sm" sx={{ top: 10 }}>
                <ThumbUpAltOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="caption">Sat, 22 Mar</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Design mobile Application</Typography>
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

export default TasksCard;
