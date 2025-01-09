'use client';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import MainCard from 'components/ui-component/cards/MainCard';
import SecondaryAction from 'components/ui-component/cards/CardSecondaryAction';
import {
  ColorVariants,
  CustomComponent,
  Dense,
  DismissSnackBar,
  HideDuration,
  IconVariants,
  MaxSnackbar,
  PositioningSnackbar,
  PreventDuplicate,
  SnackBarAction,
  TransitionBar
} from 'components/ui-component/extended/notistack';

import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// ==============================|| UI SNACKBAR ||============================== //

const UISnackbar = () => {
  const theme = useTheme();

  return (
    <MainCard title="Snackbar" secondary={<SecondaryAction link="https://next.material-ui.com/components/snackbars/" />}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6} md={4}>
          <SubCard title="Basic Snackbar">
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert',
                        close: false
                      })
                    )
                  }
                >
                  Default
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    color: 'error.dark',
                    borderColor: 'error.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2), borderColor: 'error.dark' }
                  }}
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          color: 'error'
                        },
                        close: false
                      })
                    )
                  }
                >
                  Error
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'success.dark',
                    borderColor: 'success.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.2), borderColor: 'success.dark' }
                  }}
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    )
                  }
                >
                  Success
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'warning.dark',
                    borderColor: 'warning.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.2), borderColor: 'warning.dark' }
                  }}
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          color: 'warning'
                        },
                        close: false
                      })
                    )
                  }
                >
                  Warning
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <SubCard title="With Close">
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert'
                      })
                    )
                  }
                >
                  Default
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    color: 'error.dark',
                    borderColor: 'error.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2), borderColor: 'error.dark' }
                  }}
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          color: 'error'
                        }
                      })
                    )
                  }
                >
                  Error
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'success.dark',
                    borderColor: 'success.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.2), borderColor: 'success.dark' }
                  }}
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        }
                      })
                    )
                  }
                >
                  Success
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'warning.dark',
                    borderColor: 'warning.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.2), borderColor: 'warning.dark' }
                  }}
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          color: 'warning'
                        }
                      })
                    )
                  }
                >
                  Warning
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <SubCard title="With Close + Action">
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is default message',
                        variant: 'alert',
                        actionButton: true
                      })
                    )
                  }
                >
                  Default
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    color: 'error.dark',
                    borderColor: 'error.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2), borderColor: 'error.dark' }
                  }}
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is error message',
                        variant: 'alert',
                        alert: {
                          color: 'error'
                        },
                        actionButton: true
                      })
                    )
                  }
                >
                  Error
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'success.dark',
                    borderColor: 'success.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.2), borderColor: 'success.dark' }
                  }}
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is success message',
                        variant: 'alert',
                        alert: {
                          color: 'success'
                        },
                        actionButton: true
                      })
                    )
                  }
                >
                  Success
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'warning.dark',
                    borderColor: 'warning.dark',
                    '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.2), borderColor: 'warning.dark' }
                  }}
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is warning message',
                        variant: 'alert',
                        alert: {
                          color: 'warning'
                        },
                        actionButton: true
                      })
                    )
                  }
                >
                  Warning
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SubCard title="Snackbar Position">
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'left' },
                        message: 'This is an top-left message!'
                      })
                    )
                  }
                >
                  Top-Left
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        message: 'This is an top-center message!'
                      })
                    )
                  }
                >
                  Top-Center
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        message: 'This is an top-right message!'
                      })
                    )
                  }
                >
                  Top-Right
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                        message: 'This is an bottom-right message!'
                      })
                    )
                  }
                >
                  Bottom-Right
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                        message: 'This is an bottom-center message!'
                      })
                    )
                  }
                >
                  Bottom-Center
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        message: 'This is an bottom-left message!'
                      })
                    )
                  }
                >
                  Bottom-Left
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SubCard title="Snackbar Trasition">
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is an fade message!',
                        transition: 'Fade'
                      })
                    )
                  }
                >
                  Default/Fade
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-left message!',
                        transition: 'SlideLeft'
                      })
                    )
                  }
                >
                  Slide Left
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-up message!',
                        transition: 'SlideUp'
                      })
                    )
                  }
                >
                  Slide Up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-right message!',
                        transition: 'SlideRight'
                      })
                    )
                  }
                >
                  Slide Right
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is an slide-down message!',
                        transition: 'SlideDown'
                      })
                    )
                  }
                >
                  Slide Down
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: 'This is an grow message!',
                        transition: 'Grow'
                      })
                    )
                  }
                >
                  Grow
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Extended - Notistack
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ColorVariants />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MaxSnackbar />
        </Grid>
        <Grid item xs={12} lg={6}>
          <IconVariants />
        </Grid>
        <Grid item xs={12} lg={6}>
          <HideDuration />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SnackBarAction />
        </Grid>
        <Grid item xs={12} lg={6}>
          <DismissSnackBar />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PreventDuplicate />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TransitionBar />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Dense />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomComponent />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PositioningSnackbar />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UISnackbar;
