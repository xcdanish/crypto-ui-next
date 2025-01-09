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

// assets
const big = '/assets/images/customization/big.svg';
const small = '/assets/images/customization/small.svg';

const ContainerType = {
  CONTAINER: 'container',
  FLUID: 'fluid'
};

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const BoxContainer = () => {
  const { container, onChangeContainer } = useConfig();

  return (
    <Stack direction="row" alignItems="center" pb={2} px={2} justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
      <Typography variant="h5">THEME WIDTH</Typography>
      <RadioGroup
        row
        aria-label="container-fluid"
        value={container ? ContainerType.CONTAINER : ContainerType.FLUID}
        onChange={(e) => onChangeContainer(e.target.value === ContainerType.CONTAINER)}
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          control={<Radio value={ContainerType.FLUID} sx={{ display: 'none' }} />}
          label={
            <Avatar
              size="md"
              variant="rounded"
              outline
              sx={{ mr: 1.25, width: 48, height: 48, ...(container && { borderColor: 'divider' }) }}
            >
              <CardMedia component="img" src={big} alt="defaultLayout" sx={{ width: 28, height: 28 }} />
            </Avatar>
          }
        />
        <FormControlLabel
          control={<Radio value={ContainerType.CONTAINER} sx={{ display: 'none' }} />}
          label={
            <Avatar size="md" variant="rounded" outline sx={{ width: 48, height: 48, ...(!container && { borderColor: 'divider' }) }}>
              <CardMedia component="img" src={small} alt="defaultLayout" sx={{ width: 16, height: 28 }} />
            </Avatar>
          }
        />
      </RadioGroup>
    </Stack>
  );
};

export default BoxContainer;
