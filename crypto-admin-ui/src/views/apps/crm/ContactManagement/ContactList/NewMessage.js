import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// assets
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

// ==============================|| CONTACT - NEW MESSAGE ||============================== //

const ContactNewMessage = ({ open, handleToggleMsgDialog }) => (
  <Dialog
    open={open}
    onClose={handleToggleMsgDialog}
    sx={{
      '& .MuiDialog-paper': {
        maxWidth: '100%',
        width: 596,
        borderRadius: 3,
        py: 0
      }
    }}
  >
    {open && (
      <>
        <DialogTitle sx={{ px: 3, py: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h4">New Message</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                <IconButton size="medium">
                  <OpenInFullIcon sx={{ transform: 'rotate(90deg)' }} />
                </IconButton>
                <IconButton sx={{ p: 0 }} size="medium" onClick={handleToggleMsgDialog}>
                  <CancelTwoToneIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <MainCard content={false}>
            <CardContent sx={{ px: 3, py: '0px !important' }}>
              <TextField fullWidth id="outlined-multiline-flexible" placeholder="Type a message" multiline rows={5} />
            </CardContent>
          </MainCard>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={0}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <UploadFileOutlinedIcon fontSize="small" />
                <Button variant="text" startIcon={<InsertDriveFileOutlinedIcon />} size="small">
                  file.doc
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Stack spacing={1.5} direction="row">
                <AnimateButton>
                  <Button variant="outlined" size="small">
                    Reset
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button variant="contained" size="small" onClick={handleToggleMsgDialog}>
                    Send
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </>
    )}
  </Dialog>
);

ContactNewMessage.propTypes = {
  open: PropTypes.bool,
  handleToggleMsgDialog: PropTypes.func
};

export default ContactNewMessage;
