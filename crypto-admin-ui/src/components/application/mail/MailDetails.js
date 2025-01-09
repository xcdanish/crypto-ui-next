'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'react-quill/dist/quill.snow.css';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import Avatar from 'components/ui-component/extended/Avatar';
import AttachmentCard from 'components/ui-component/cards/AttachmentCard';
import SubCard from 'components/ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { ThemeMode } from 'config';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import ForwardTwoToneIcon from '@mui/icons-material/ForwardTwoTone';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const avatarImage = '/assets/images/users';

// ==============================|| MAIL DETAILS ||============================== //

const MailDetails = ({ handleUserDetails, data, handleStarredChange, handleImportantChange }) => {
  const theme = useTheme();
  const { fontFamily } = useConfig();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickSort = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const [openQuill, setOpenQuill] = useState(false);
  const handleChangeQuill = () => {
    setOpenQuill(true);
  };

  return (
    <MainCard sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50' }} content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 1, md: 0 }}>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }}>
                  <IconButton onClick={(e) => handleUserDetails(e, null)} size="small">
                    <KeyboardArrowLeftTwoToneIcon />
                  </IconButton>
                  <Avatar
                    alt={data?.profile.name}
                    src={data?.profile && data.profile.avatar && `${avatarImage}/${data.profile.avatar}`}
                    size={downMD ? 'xs' : 'sm'}
                  />
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        spacing={{ xs: 0, md: 1 }}
                      >
                        <Typography variant={downMD ? 'h5' : 'h4'}>{data?.profile.name}</Typography>
                        <Typography sx={{ display: { xs: 'block', sm: 'none' } }} variant="subtitle2">
                          From: &lt;{data?.profile.to}&gt;
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Typography variant="subtitle2">From: &lt;{data?.profile.to}&gt;</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{format(new Date(data?.time), 'd MMM')}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent sx={{ pt: 0 }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={0}>
                  <Grid item>
                    <Typography variant={downMD ? 'h4' : 'h3'}>{data?.subject}</Typography>
                  </Grid>
                  <Grid item xs zeroMinWidth />
                  <Grid item>
                    <Checkbox
                      checked={data?.starred}
                      icon={<StarBorderTwoToneIcon />}
                      checkedIcon={<StarTwoToneIcon />}
                      sx={{ '&.Mui-checked': { color: 'warning.dark' } }}
                      onChange={(event) => handleStarredChange(event, data)}
                    />
                  </Grid>
                  <Grid item>
                    <Checkbox
                      checked={data?.important}
                      icon={<LabelTwoToneIcon />}
                      checkedIcon={<LabelTwoToneIcon />}
                      sx={{ '&.Mui-checked': { color: 'secondary.main' } }}
                      onChange={(event) => handleImportantChange(event, data)}
                    />
                  </Grid>
                  <Grid item>
                    <Checkbox
                      defaultChecked={false}
                      icon={<NewReleasesTwoToneIcon />}
                      checkedIcon={<NewReleasesTwoToneIcon />}
                      sx={{ '&.Mui-checked': { color: 'error.main' } }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleClickSort} size="large">
                      <MoreHorizTwoToneIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseSort}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleCloseSort}>Name</MenuItem>
                      <MenuItem onClick={handleCloseSort}>Date</MenuItem>
                      <MenuItem onClick={handleCloseSort}>Ratting</MenuItem>
                      <MenuItem onClick={handleCloseSort}>Unread</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Typography variant="body2">Dear {data?.profile.name},</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, marginBottom: 0 } }}>
                    <Markdown remarkPlugins={[remarkGfm]}>{data?.message}</Markdown>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Kind Regards,</Typography>
                    <Typography variant="body2">{data?.sender.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {data?.attachments && (
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AttachmentTwoToneIcon fontSize="small" />
                        <Typography variant="h5">{data?.attachments.length} </Typography>
                        <Typography variant="h5">Attachments</Typography>
                      </Stack>
                    </Grid>
                    {data?.attachments.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <AttachmentCard image={item.image} title={item.title} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Button variant="outlined" startIcon={<ReplyTwoToneIcon />} onClick={handleChangeQuill}>
                      Reply
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" startIcon={<ForwardTwoToneIcon />} onClick={handleChangeQuill}>
                      Forward
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Collapse in={openQuill} sx={{ width: '100%' }}>
                {openQuill && (
                  <Grid item xs={12} sx={{ p: 3 }}>
                    <SubCard
                      sx={{
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : alpha(theme.palette.primary[200], 0.4),
                        '& .quill': {
                          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
                          borderRadius: '12px',
                          '& .ql-toolbar': {
                            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'grey.100',
                            borderColor: theme.palette.mode === ThemeMode.DARK ? alpha(theme.palette.dark.light, 0.2) : 'primary.light',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px'
                          },
                          '& .ql-container': {
                            fontFamily,
                            fontSize: '0.875rem',
                            borderColor:
                              theme.palette.mode === ThemeMode.DARK
                                ? `${alpha(theme.palette.dark.light, 0.2)} !important`
                                : 'primary.light',
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
                      <Grid container spacing={1} alignItems="center" sx={{ mt: 2 }}>
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
                          <Button onClick={() => setOpenQuill(false)} sx={{ color: 'grey.900' }}>
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="contained">Reply</Button>
                        </Grid>
                      </Grid>
                    </SubCard>
                  </Grid>
                )}
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

MailDetails.propTypes = {
  data: PropTypes.object,
  handleUserDetails: PropTypes.func,
  handleStarredChange: PropTypes.func,
  handleImportantChange: PropTypes.func
};

export default MailDetails;
