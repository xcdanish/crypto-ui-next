'use client';

import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - SLIDE ANIMATION ||=============================== //

export default function AlertDialogSlide() {
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
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title1"
        aria-describedby="alert-dialog-slide-description1"
      >
        {open && (
          <>
            <DialogTitle id="alert-dialog-slide-title1">Use Google&apos;s location service?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description1">
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
              <Button variant="contained" size="small" onClick={handleClose}>
                Agree
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
