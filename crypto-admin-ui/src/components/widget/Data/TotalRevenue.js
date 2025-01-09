// material-ui
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

// assets
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// ===========================|| DASHBOARD ANALYTICS - TOTAL REVENUE CARD ||=========================== //

const TotalRevenue = () => {
  const successSX = { color: 'success.dark' };
  const errorSX = { color: 'error.main' };

  return (
    <MainCard title="Total Revenue" content={false}>
      <PerfectScrollbar style={{ height: 370 }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            '& svg': {
              width: 32,
              my: -0.75,
              ml: -0.75,
              mr: 0.75
            }
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropUpIcon sx={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Bitcoin</span>
                  <Typography sx={successSX}>+ $145.85</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropDownIcon sx={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ethereum</span>
                  <Typography sx={errorSX}>- $6.368</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropUpIcon sx={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ripple</span>
                  <Typography sx={successSX}>+ $458.63</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropDownIcon sx={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Neo</span>
                  <Typography sx={errorSX}>- $5.631</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropDownIcon sx={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ethereum</span>
                  <Typography sx={errorSX}>- $6.368</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropUpIcon sx={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ripple</span>
                  <Typography sx={successSX}>+ $458.63</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropDownIcon sx={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Neo</span>
                  <Typography sx={errorSX}>- $5.631</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropDownIcon sx={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ethereum</span>
                  <Typography sx={errorSX}>- $6.368</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropUpIcon sx={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ripple</span>
                  <Typography sx={successSX}>+ $458.63</Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDropDownIcon sx={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Neo</span>
                  <Typography sx={errorSX}>- $5.631</Typography>
                </Stack>
              }
            />
          </ListItemButton>
        </List>
      </PerfectScrollbar>
    </MainCard>
  );
};

export default TotalRevenue;
