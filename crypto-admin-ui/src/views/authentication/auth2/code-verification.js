'use client';

import Image from 'next/image';
import Link from 'next/link';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AuthFooter from 'components/ui-component/cards/AuthFooter';
import AuthWrapper2 from 'components/authentication/AuthWrapper2';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'components/ui-component/Logo';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import BackgroundPattern2 from 'components/ui-component/cards/BackgroundPattern2';
import AuthSlider from 'components/ui-component/cards/AuthSlider';
import AuthCodeVerification from 'components/authentication/auth-forms/AuthCodeVerification';

// assets
const imgMain = '/assets/images/auth/img-a2-codevarify.svg';

// carousel items
const items = [
  {
    title: 'Powerful and easy to use multi-purpose theme.',
    description: 'Powerful and easy to use multipurpose theme'
  },
  {
    title: 'Powerful and easy to use multi-purpose theme.',
    description: 'Powerful and easy to use multipurpose theme'
  },
  {
    title: 'Powerful and easy to use multi-purpose theme.',
    description: 'Powerful and easy to use multipurpose theme'
  }
];

// ===========================|| AUTH2 - CODE VERIFICATION ||=========================== //

const CodeVerification = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <AuthWrapper2>
      <Grid container justifyContent={{ xs: 'center', md: 'space-between' }} alignItems="center">
        <Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
          <Grid
            sx={{ minHeight: '100vh' }}
            container
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center', md: 'space-between' }}
          >
            <Grid item sx={{ display: { xs: 'none', md: 'block' }, m: 3 }}>
              <Link href="#" aria-label="theme-logo">
                <Logo />
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' } }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
                <Box component={Link} href="#" sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Logo />
                </Box>
                <AuthCardWrapper border={downLG}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                          Enter Verification Code
                        </Typography>
                        <Typography variant="subtitle1" fontSize="1rem">
                          We send you on mail.
                        </Typography>
                        <Typography variant="caption" fontSize="0.875rem" textAlign="center">
                          We’ve send you code on john.****@company.com
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthCodeVerification />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={Link} href="#" variant="subtitle1" sx={{ textAlign: 'center', textDecoration: 'none' }}>
                          Did not receive the email? Check your spam filter, or
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button disableElevation fullWidth size="large" type="submit" variant="outlined" color="secondary">
                          Resend Code
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ m: 3 }}>
              <AuthFooter />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <BackgroundPattern2>
            <Grid item container justifyContent="center">
              <Grid item xs={12}>
                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                  <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                    <AuthSlider items={items} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  maxWidth: '100%',
                  margin: '0 auto',
                  display: 'block',
                  textAlign: 'center'
                }}
                xs={12}
              >
                <Image alt="Auth method" src={imgMain} width={300} height={340} style={{ maxWidth: '100%', height: 'auto' }} />
              </Grid>
            </Grid>
          </BackgroundPattern2>
        </Grid>
      </Grid>
    </AuthWrapper2>
  );
};

export default CodeVerification;
