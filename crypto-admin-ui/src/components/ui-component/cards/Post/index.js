'use client';

import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import * as yup from 'yup';
import { uniqueId } from 'lodash-es';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// project imports
import Comment from './Comment';
import MainCard from '../MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import ImageList from 'components/ui-component/extended/ImageList';
import Avatar from 'components/ui-component/extended/Avatar';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';

const avatarImage = '/assets/images/users';

const validationSchema = yup.object().shape({
  name: yup.string().required('Comment Field is Required')
});

// ==============================|| COMMENT TEXTFIELD ||============================== //

const FormInput = ({ bug, label, size, fullWidth = true, name, required, ...others }) => {
  let isError = false;
  let errorMessage = '';
  if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
    isError = true;
    errorMessage = bug[name].message;
  }

  return (
    <>
      <Controller
        name={name}
        defaultValue=""
        render={({ field }) => (
          <TextField
            fullWidth={fullWidth}
            size={size}
            label={label}
            InputLabelProps={{
              className: required ? 'required-label' : '',
              required: required || false
            }}
            error={isError}
            {...field}
          />
        )}
        {...others}
      />
      {errorMessage && (
        <Grid item xs={12}>
          <FormHelperText error>{errorMessage}</FormHelperText>
        </Grid>
      )}
    </>
  );
};

FormInput.propTypes = {
  bug: PropTypes.object,
  size: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool
};

// ==============================|| SOCIAL PROFILE - POST ||============================== //

const Post = ({ commentAdd, handleCommentLikes, handlePostLikes, handleReplayLikes, post, replyAdd }) => {
  const theme = useTheme();
  const { id, data, profile } = post;
  const { borderRadius } = useConfig();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorSharedEl, setAnchorSharedEl] = React.useState(null);
  const handleSharedClick = (event) => {
    setAnchorSharedEl(event.currentTarget);
  };

  const handleSharedClose = () => {
    setAnchorSharedEl(null);
  };

  const [openComment, setOpenComment] = React.useState(!(data.comments && data.comments.length > 0));
  const handleChangeComment = () => {
    setOpenComment((prev) => !prev);
  };

  let commentsResult = <></>;
  if (data && data.comments) {
    commentsResult = data.comments.map((comment) => (
      <Comment
        postId={id}
        comment={comment}
        key={comment.id}
        user={profile}
        replyAdd={replyAdd}
        handleCommentLikes={handleCommentLikes}
        handleReplayLikes={handleReplayLikes}
      />
    ));
  }

  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = methods;
  const onSubmit = async (comment) => {
    handleChangeComment();
    const commentId = uniqueId('#COMMENT_');
    const newComment = {
      id: commentId,
      profile,
      data: {
        comment: comment.name,
        likes: {
          like: false,
          value: 0
        },
        replies: []
      }
    };
    commentAdd(id, newComment);
    reset({ name: '' });
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar alt="User 1" src={`${avatarImage}/${profile.avatar}`} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h5">{profile.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {profile.time}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick} aria-label="Add to Cart product">
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.smallAvatar,
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
                    color: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.dark',
                    zIndex: 1,
                    transition: 'all .2s ease-in-out',
                    '&[aria-controls="menu-list-grow"],&:hover': { bgcolor: 'secondary.main', color: 'secondary.light' }
                  }}
                  aria-controls="menu-post"
                  aria-haspopup="true"
                >
                  <MoreVertTwoToneIcon fontSize="inherit" />
                </Avatar>
              </ButtonBase>
              <Menu
                id="menu-post"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>

        {/* post - content */}
        <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, mb: 0 } }}>
          <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
        </Grid>

        {/* post - photo grid */}
        {data && data.images && data.images.length > 0 && (
          <Grid item xs={12}>
            <ImageList itemData={data.images} />
          </Grid>
        )}

        {/* post - video */}
        {data.video && (
          <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 2 } }}>
            <CardMedia
              sx={{ borderRadius: `${borderRadius}px`, height: { xs: 220, lg: 330 } }}
              component="iframe"
              src={`https://www.youtube.com/embed/${data.video}`}
            />
          </Grid>
        )}

        {/* post - comment, likes and replay history */}
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mt: 0, color: theme.palette.mode === ThemeMode.DARK ? 'grey.700' : 'grey.800' }}
          >
            <Grid item>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="text"
                  onClick={() => handlePostLikes(id)}
                  color="inherit"
                  size="small"
                  startIcon={<ThumbUpAltTwoToneIcon color={data && data.likes && data.likes.like ? 'primary' : 'inherit'} />}
                >
                  {data && data.likes && data.likes.value ? data.likes.value : 0}
                  <Typography color="inherit" sx={{ fontWeight: 500, ml: 0.5, display: { xs: 'none', sm: 'block' } }}>
                    likes
                  </Typography>
                </Button>
                <Button
                  onClick={handleChangeComment}
                  size="small"
                  variant="text"
                  color="inherit"
                  startIcon={<ChatBubbleTwoToneIcon color="secondary" />}
                >
                  {data.comments ? data.comments.length : 0} comments
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <IconButton onClick={handleSharedClick} size="large" aria-label="more options">
                <ShareTwoToneIcon sx={{ width: '16px', height: '16px' }} />
              </IconButton>
              <Menu
                id="menu-post"
                anchorEl={anchorSharedEl}
                keepMounted
                open={Boolean(anchorSharedEl)}
                onClose={handleSharedClose}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                sx={{
                  '& .MuiSvgIcon-root': {
                    marginRight: '14px',
                    fontSize: '1.25rem'
                  }
                }}
              >
                <MenuItem onClick={handleSharedClose}>
                  <ShareTwoToneIcon fontSize="inherit" /> Share Now
                </MenuItem>
                <MenuItem onClick={handleSharedClose}>
                  <PeopleAltTwoToneIcon fontSize="inherit" /> Share to Friends
                </MenuItem>
                <MenuItem onClick={handleSharedClose}>
                  <ChatTwoToneIcon fontSize="inherit" /> Send in Messanger
                </MenuItem>
                <MenuItem onClick={handleSharedClose}>
                  <ContentCopyTwoToneIcon fontSize="inherit" /> Copy Link
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
        {/* add new comment */}
        <Collapse in={openComment} sx={{ width: '100%' }}>
          {openComment && (
            <Grid item xs={12} sx={{ pt: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Avatar
                      sx={{ mt: 0.75 }}
                      alt="User 1"
                      src={profile && profile.avatar ? `${avatarImage}/${profile.avatar}` : `${avatarImage}/avatar-1.png`}
                      size="xs"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <FormProvider {...methods}>
                      <FormInput fullWidth name="name" label="Write a comment..." size={downMD ? 'small' : 'medium'} bug={errors} />
                    </FormProvider>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button type="submit" variant="contained" color="secondary" size={downMD ? 'small' : 'large'} sx={{ mt: 0.5 }}>
                        Comment
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          )}
        </Collapse>
        {commentsResult}
      </Grid>
    </MainCard>
  );
};

Post.propTypes = {
  commentAdd: PropTypes.func,
  handleCommentLikes: PropTypes.func,
  handlePostLikes: PropTypes.func,
  handleReplayLikes: PropTypes.func,
  post: PropTypes.object,
  replyAdd: PropTypes.func
};

export default Post;
