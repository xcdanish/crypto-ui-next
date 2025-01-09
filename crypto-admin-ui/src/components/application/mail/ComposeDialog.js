'use client';

import { useState, forwardRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import 'react-quill/dist/quill.snow.css';

// project imports
import { gridSpacing } from 'store/constant';
import { ThemeMode } from 'config';

// assets
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { IconArrowsDiagonal2 } from '@tabler/icons-react';

// third-party
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ==============================|| MAIL COMPOSE DIALOG ||============================== //

const ComposeDialog = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [ccBccValue, setCcBccValue] = useState(false);
  const handleCcBccChange = () => {
    setCcBccValue((prev) => !prev);
  };

  let composePosition = {};

  const [position, setPosition] = useState(true);
  if (!position) {
    composePosition = {
      '& .MuiDialog-container': {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        '& .MuiPaper-root': { mb: 0, borderRadius: '12px 12px 0px 0px', maxWidth: 595 }
      }
    };
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} sx={{ width: '100%' }} size="large" startIcon={<AddCircleOutlineTwoToneIcon />}>
        Compose
      </Button>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
        {open && (
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={0}>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h4">New Message</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => setPosition(!position)} size="large">
                      <IconArrowsDiagonal2 />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleCloseDialog} size="large">
                      <HighlightOffTwoToneIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={0}>
                  <Grid item>
                    <MuiLink
                      component={Link}
                      href="#"
                      color={theme.palette.mode === ThemeMode.DARK ? 'primary' : 'secondary'}
                      onClick={handleCcBccChange}
                      underline="hover"
                    >
                      CC & BCC
                    </MuiLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="To" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Subject" />
              </Grid>
              <Grid item xs={12} sx={{ display: ccBccValue ? 'block' : 'none' }}>
                <Collapse in={ccBccValue}>
                  {ccBccValue && (
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <TextField fullWidth label="CC" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="BCC" />
                      </Grid>
                    </Grid>
                  )}
                </Collapse>
              </Grid>

              {/* quill editor */}
              <Grid
                item
                xs={12}
                sx={{
                  '& .quill': {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
                    borderRadius: '12px',
                    '& .ql-toolbar': {
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'grey.100',
                      borderColor: theme.palette.mode === ThemeMode.DARK ? alpha(theme.palette.dark.light, 0.2) : 'grey.400',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px'
                    },
                    '& .ql-container': {
                      borderColor:
                        theme.palette.mode === ThemeMode.DARK
                          ? `${alpha(theme.palette.dark.light, 0.2)} !important`
                          : `${theme.palette.grey[400]} !important`,
                      borderBottomLeftRadius: '12px',
                      borderBottomRightRadius: '12px',
                      '& .ql-editor': {
                        minHeight: 125
                      }
                    }
                  }
                }}
              >
                <ReactQuill theme="snow" />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconButton size="large">
                      <UploadFileIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton size="large">
                      <AttachmentTwoToneIcon />
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ flexGrow: 1 }} />
                  <Grid item>
                    <Button variant="contained">Reply</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ComposeDialog;
