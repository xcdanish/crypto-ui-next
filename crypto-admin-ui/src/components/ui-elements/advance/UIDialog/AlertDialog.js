'use client';

import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

// ===============================|| UI DIALOG - SWEET ALERT ||=============================== //

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 3 }}
      >
        {open && (
          <>
            <DialogTitle id="alert-dialog-title">Use Google&apos;s location service?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Typography variant="body2" component="span">
                  Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are
                  running.
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pr: 2.5 }}>
              <Button sx={{ color: 'error.dark', borderColor: 'error.dark' }} onClick={handleClose} color="secondary">
                Disagree
              </Button>
              <Button variant="contained" size="small" onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
