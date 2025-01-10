import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * If you want to use an image instead of SVG uncomment the following.
     */
    <img src="/assets/hicon.jpg" alt="Berry" width="40px" style={{borderRadius:"50%"}}/>
  );
};

export default Logo;
