import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AddContactDialogContent from './AddContactDialogContent';
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// assets
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

// ==============================|| ADD CONTACT ||============================== //

const AddContactDialog = ({ open, handleToggleAddDialog, row }) => (
  <Dialog open={open} sx={{ '.css-tmnkt9-MuiPaper-root-MuiDialog-paper': { p: 0 } }} onClose={handleToggleAddDialog}>
    {open && (
      <>
        <DialogTitle sx={{ px: 3, py: 2.5 }}>
          <Stack direction="row" justifyContent="space-between">
            {!row ? (
              <Typography variant="h4">Add Contact</Typography>
            ) : (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4">Edit Contact</Typography>
                <Typography variant="h4" sx={{ color: 'grey.400' }}>
                  #{row.id}
                </Typography>
              </Stack>
            )}
            <IconButton sx={{ p: 0 }} size="medium" onClick={handleToggleAddDialog}>
              <CancelTwoToneIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <AddContactDialogContent {...{ row }} />
        <DialogActions sx={{ p: 3 }}>
          <Stack spacing={1.5} direction="row" justifyContent="flex-end">
            <AnimateButton>
              <Button onClick={handleToggleAddDialog} variant="outlined">
                Cancel
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button variant="contained" onClick={handleToggleAddDialog}>
                Add
              </Button>
            </AnimateButton>
          </Stack>
        </DialogActions>
      </>
    )}
  </Dialog>
);

AddContactDialog.propTypes = {
  row: PropTypes.object,
  open: PropTypes.bool,
  handleToggleAddDialog: PropTypes.func
};

export default AddContactDialog;
