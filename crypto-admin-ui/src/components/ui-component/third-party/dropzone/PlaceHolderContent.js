import PropTypes from 'prop-types';

// material-ui
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import { DropzoneType } from 'components/ui-component/third-party/dropzone/constant';

// assets
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const UploadCover = '/assets/images/upload/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }) {
  return (
    <>
      {type !== DropzoneType.standard && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Drag & Drop or Select file</Typography>

            <Typography color="secondary.main">
              Drop files here or click&nbsp;
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          </Stack>
        </Stack>
      )}
      {type === DropzoneType.standard && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <CameraAltOutlinedIcon style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}

PlaceholderContent.propTypes = {
  type: PropTypes.string
};
