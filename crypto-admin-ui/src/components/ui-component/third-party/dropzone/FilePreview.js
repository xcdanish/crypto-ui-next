import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import CardMedia from '@mui/material/CardMedia';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';

// project import
import getDropzoneData from 'utils/getDropzoneData';
import useConfig from 'hooks/useConfig';
import { DropzoneType } from './constant';

// assets
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreview({ showList = false, files, onRemove, type }) {
  const { borderRadius } = useConfig();

  const hasFile = files.length > 0;
  const layoutType = type;

  return (
    <List
      disablePadding
      sx={{
        ...(hasFile && type !== DropzoneType.standard && { my: 3 }),
        ...(type === DropzoneType.standard && { width: 'calc(100% - 84px)' })
      }}
    >
      {files.map((file, index) => {
        const { key, name, size, preview, type } = getDropzoneData(file, index);

        if (showList) {
          return (
            <ListItem
              key={key}
              sx={{
                p: 0,
                m: 0.5,
                width: layoutType === DropzoneType.standard ? 64 : 80,
                height: layoutType === DropzoneType.standard ? 64 : 80,
                borderRadius: `${borderRadius}px`,
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'text-top',
                border: 'solid 1px',
                borderColor: 'secondary.light',
                overflow: 'hidden'
              }}
            >
              {type?.includes('image') && <CardMedia alt="preview" component="img" src={preview} sx={{ width: '100%' }} />}
              {!type?.includes('image') && <InsertDriveFileOutlinedIcon style={{ width: '100%', fontSize: '1.5rem' }} />}

              {onRemove && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onRemove(file)}
                  sx={{
                    fontSize: '0.875rem',
                    bgcolor: 'background.paper',
                    p: 0,
                    width: 'auto',
                    height: 'auto',
                    top: 2,
                    right: 2,
                    position: 'absolute'
                  }}
                >
                  <HighlightOffIcon style={{ fontSize: '1rem' }} />
                </IconButton>
              )}
            </ListItem>
          );
        }

        return (
          <ListItem
            key={key}
            sx={{
              my: 1,
              px: 2,
              py: 0.75,
              borderRadius: `${borderRadius}px`,
              border: 'solid 1px',
              borderColor: 'secondary.light'
            }}
          >
            <InsertDriveFileOutlinedIcon sx={{ color: 'secondary.main', width: 30, height: 30, fontSize: '1.15rem', mr: 0.5 }} />
            <ListItemText
              primary={typeof file === 'string' ? file : name}
              secondary={typeof file === 'string' ? '' : size}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />

            {onRemove && (
              <IconButton edge="end" size="small" onClick={() => onRemove(file)} color="error">
                <HighlightOffIcon style={{ fontSize: '1.15rem' }} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

FilesPreview.propTypes = {
  files: PropTypes.array,
  showList: PropTypes.bool,
  onRemove: PropTypes.func,
  type: PropTypes.string
};
