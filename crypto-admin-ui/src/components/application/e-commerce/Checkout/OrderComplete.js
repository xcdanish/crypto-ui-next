import PropTypes from 'prop-types';
import Image from 'next/image';
import { forwardRef } from 'react';
import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { Chance } from 'chance';
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const completed = '/assets/images/e-commerce/completed.png';

const chance = new Chance();

const Transition = forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({ open }) => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      {open && (
        <MainCard>
          <PerfectScrollbar
            style={{
              overflowX: 'hidden',
              height: 'calc(100vh - 100px)'
            }}
          >
            <Grid container direction="column" spacing={gridSpacing} alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <Grid item xs={12}>
                <Typography variant={downMD ? 'h2' : 'h1'}>Thank you for order!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack alignItems="center" spacing={2}>
                  <Typography align="center" variant="h4" sx={{ fontWeight: 400, color: 'grey.500' }}>
                    We will send a process notification, before it delivered.
                  </Typography>
                  <Typography variant="body1" align="center">
                    Your order id:{' '}
                    <Typography variant="subtitle1" component="span" color="primary">
                      {chance.guid()}
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ m: 3 }}>
                <Image src={completed} alt="Order Complete" fill sizes="100vw" />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Stack alignItems="center" spacing={1}>
                  <Typography variant="caption" align="center">
                    If you have any query or questions regarding purchase items, then fell to get in contact us
                  </Typography>
                  <Typography variant="subtitle1" color="error" sx={{ cursor: 'pointer' }}>
                    {chance.phone()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  container
                  spacing={3}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Button component={Link} href="/apps/e-commerce/products" variant="text" startIcon={<KeyboardBackspaceIcon />}>
                      Continue Shopping
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} href="/apps/e-commerce/products" variant="contained" fullWidth>
                      Download Invoice
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PerfectScrollbar>
        </MainCard>
      )}
    </Dialog>
  );
};

OrderComplete.propTypes = {
  open: PropTypes.bool
};

export default OrderComplete;
