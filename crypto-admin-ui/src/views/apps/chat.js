'use client';

import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import UserDetails from 'components/application/chat/UserDetails';
import ChatDrawer from 'components/application/chat/ChatDrawer';
import ChartHistory from 'components/application/chat/ChartHistory';
import AvatarStatus from 'components/application/chat/AvatarStatus';
import EmojiPicker from 'components/ui-component/third-party/EmojiPicker';

import Loader from 'components/ui-component/Loader';
import MainCard from 'components/ui-component/cards/MainCard';
import Avatar from 'components/ui-component/extended/Avatar';

import { dispatch, useSelector } from 'store';
import { getUser, getUserChats, insertChat } from 'store/slices/chat';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';
import { ThemeMode } from 'config';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

const avatarImage = '/assets/images/users';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: open ? theme.spacing(3) : 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));

// ==============================|| APPLICATION CHAT ||============================== //

const ChatMainPage = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef();

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  });

  // handle right sidebar dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickSort = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  // set chat details page open when user is selected from sidebar
  const [emailDetails, setEmailDetails] = React.useState(false);
  const handleUserChange = () => {
    setEmailDetails((prev) => !prev);
  };

  // toggle sidebar
  const [openChatDrawer, setOpenChatDrawer] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setOpenChatDrawer(!downLG);
  }, [downLG]);

  const [user, setUser] = useState({});
  const [data, setData] = React.useState([]);
  const chatState = useSelector((state) => state.chat);

  useEffect(() => {
    setUser(chatState.user);
  }, [chatState.user]);

  useEffect(() => {
    setData(chatState.chats);
  }, [chatState.chats]);

  useEffect(() => {
    dispatch(getUser(1)).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    dispatch(getUserChats(user.name));
  }, [user]);

  // handle new message form
  const [message, setMessage] = useState('');
  const handleOnSend = () => {
    const d = new Date();
    setMessage('');
    const newMessage = {
      from: 'User1',
      to: user.name,
      text: message,
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setData((prevState) => [...prevState, newMessage]);
    dispatch(insertChat(newMessage));
  };

  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  if (loading) return <Loader />;

  return (
    <Box sx={{ display: 'flex' }}>
      <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen} setUser={setUser} />
      <Main theme={theme} open={openChatDrawer}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs zeroMinWidth sx={{ display: emailDetails ? { xs: 'none', sm: 'flex' } : 'flex' }}>
            <MainCard sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50' }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={0.5}>
                    <Grid item>
                      <IconButton onClick={handleDrawerOpen} size="large" aria-label="click to menu collapse">
                        <MenuRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                        <Grid item>
                          <Avatar alt={user.name} src={user.avatar && `${avatarImage}/${user.avatar}`} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Grid container spacing={0} alignItems="center">
                            <Grid item xs={12}>
                              <Stack direction="row" alignItems="center" spacing={0.25}>
                                <Typography variant="h4">{user.name}</Typography>
                                {user.online_status && <AvatarStatus status={user.online_status} />}
                              </Stack>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2">Last seen {user.lastMessage}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm zeroMinWidth />
                    <Grid item>
                      <IconButton size="large" aria-label="phone call options">
                        <CallTwoToneIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton size="large" aria-label="video call options">
                        <VideoCallTwoToneIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleUserChange} size="large" aria-label="user information options">
                        <ErrorTwoToneIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleClickSort} size="large" aria-label="more options">
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
                  <Divider sx={{ mt: 2 }} />
                </Grid>
                <PerfectScrollbar style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 525 }}>
                  <Box sx={{ py: 3, pl: 4, pr: 1 }}>
                    <ChartHistory theme={theme} user={user} data={data} />
                    {/* @ts-ignore */}
                    <span ref={scrollRef} />
                  </Box>
                </PerfectScrollbar>
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs zeroMinWidth>
                      <OutlinedInput
                        fullWidth
                        value={message}
                        onKeyPress={handleEnter}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Type a message"
                        startAdornment={
                          <InputAdornment position="start">
                            <EmojiPicker value={message} setValue={setMessage} />
                          </InputAdornment>
                        }
                        endAdornment={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton aria-label="attachment">
                              <AttachmentTwoToneIcon style={{ fontSize: '1.25rem' }} />
                            </IconButton>
                            <IconButton color="primary" aria-label="send" onClick={handleOnSend}>
                              <SendTwoToneIcon style={{ fontSize: '1.25rem' }} />
                            </IconButton>
                          </Stack>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          {emailDetails && (
            <Grid item sx={{ margin: { xs: '0 auto', md: 'initial' } }}>
              <Box sx={{ display: { xs: 'block', sm: 'none', textAlign: 'right' } }}>
                <IconButton onClick={handleUserChange} aria-label="highlight" sx={{ mb: -5 }} size="large">
                  <HighlightOffTwoToneIcon />
                </IconButton>
              </Box>
              <UserDetails user={user} />
            </Grid>
          )}
        </Grid>
      </Main>
    </Box>
  );
};

export default ChatMainPage;
