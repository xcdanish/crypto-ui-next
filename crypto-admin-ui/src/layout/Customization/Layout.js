// material-ui
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Avatar from 'components/ui-component/extended/Avatar';
import useConfig from 'hooks/useConfig';
import { ThemeDirection } from 'config';

// assets
const ltr = '/assets/images/customization/ltr.svg';
const rtl = '/assets/images/customization/rtl.svg';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const Layout = () => {
  const { themeDirection, onChangeDirection } = useConfig();

  const changeLayout = (e) => {
    onChangeDirection(e.target.value);
  };

  return (
    <Stack direction="row" alignItems="center" pb={2} px={2} justifyContent="space-between" spacing={2.5} sx={{ width: '100%' }}>
      <Typography variant="h5">THEME LAYOUT</Typography>
      <RadioGroup row aria-label="layout" onChange={changeLayout} value={themeDirection} name="row-radio-buttons-group">
        <FormControlLabel
          control={<Radio value={ThemeDirection.LTR} sx={{ display: 'none' }} />}
          label={
            <Avatar
              size="md"
              variant="rounded"
              outline
              sx={{
                mr: 1.25,
                width: 48,
                height: 48,
                ...(themeDirection === ThemeDirection.RTL && { borderColor: 'divider' })
              }}
            >
              <CardMedia component="img" src={ltr} alt="defaultLayout" sx={{ width: 34, height: 34 }} />
            </Avatar>
          }
        />
        <FormControlLabel
          control={<Radio value={ThemeDirection.RTL} sx={{ display: 'none' }} />}
          label={
            <Avatar
              size="md"
              variant="rounded"
              outline
              sx={{ width: 48, height: 48, ...(themeDirection !== ThemeDirection.RTL && { borderColor: 'divider' }) }}
            >
              <CardMedia component="img" src={rtl} alt="defaultLayout" sx={{ width: 34, height: 34 }} />
            </Avatar>
          }
        />
      </RadioGroup>
    </Stack>
  );
};

export default Layout;
