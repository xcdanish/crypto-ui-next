// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// third-party
import { enqueueSnackbar, useSnackbar } from 'notistack';

// project import
import SubCard from 'components/ui-component/cards/SubCard';

// ==============================|| NOTISTACK - ACTION BUTTONS ||============================== //

export default function SnackBarAction() {
  const { closeSnackbar } = useSnackbar();
  const actionTask = (snackbarId) => (
    <Stack direction="row" spacing={0.5}>
      <Button
        size="small"
        color="error"
        variant="contained"
        onClick={() => {
          // eslint-disable-next-line
          alert(`I belong to snackbar with id ${snackbarId}`);
        }}
      >
        Undo
      </Button>
      <Button size="small" color="secondary" variant="contained" onClick={() => closeSnackbar(snackbarId)}>
        Dismiss
      </Button>
    </Stack>
  );

  return (
    <SubCard title="With Action">
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => enqueueSnackbar('Your notification here', { action: (key) => actionTask(key) })}
      >
        Show Snackbar
      </Button>
    </SubCard>
  );
}
