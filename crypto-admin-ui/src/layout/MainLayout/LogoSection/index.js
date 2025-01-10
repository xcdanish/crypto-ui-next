import NextLink from 'next/link';
import { Typography } from '@mui/material';
// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'components/ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="theme logo">
    <Logo />
    {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
      Crypto UI
    </Typography> */}
  </NextLink>
);

export default LogoSection;
