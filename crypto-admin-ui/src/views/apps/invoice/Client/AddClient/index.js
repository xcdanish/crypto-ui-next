'use client';

import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import PersonalInformation from './PersonalInformation';
import ContactDetail from './ContactDetail';
import Address from './Address';
import OtherDetail from './OtherDetail';
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { ThemeMode } from 'config';

// assets
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PersonAddTwoTone from '@mui/icons-material/PersonAddTwoTone';
import PinDropTwoTone from '@mui/icons-material/PinDropTwoTone';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

// tabs
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// tabs option
const tabsOption = [
  {
    label: 'Personal information',
    icon: <PersonAddTwoTone />,
    caption: 'Profile Settings'
  },
  {
    label: 'Contact detail',
    icon: <RecentActorsIcon />,
    caption: 'Contact Information'
  },
  {
    label: 'Address detail',
    icon: <PinDropTwoTone />,
    caption: 'Address detail'
  },
  {
    label: 'Other Detail',
    icon: <WorkTwoToneIcon />,
    caption: 'Update Profile Security'
  }
];

// ==============================|| ADD CLIENT ||============================== //

const AddClient = ({ isOpen, handleDialogToggler }) => {
  const { mode, borderRadius } = useConfig();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Add New Client" content={false}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={3}>
              <CardContent sx={{ pr: 0 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  orientation="vertical"
                  variant="scrollable"
                  sx={{
                    '& .MuiTabs-flexContainer': {
                      borderBottom: 'none'
                    },
                    '& button': {
                      color: mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                      minHeight: 'auto',
                      minWidth: '100%',
                      py: 1.5,
                      px: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      borderRadius: `${borderRadius}px`
                    },
                    '& button.Mui-selected': {
                      color: 'primary.main',
                      bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                    },
                    '& button > svg': {
                      marginBottom: '0px !important',
                      marginRight: 1.25,
                      marginTop: 1.25,
                      height: 20,
                      width: 20
                    },
                    '& button > div > span': {
                      display: 'block'
                    },
                    '& > div > span': {
                      display: 'none'
                    }
                  }}
                >
                  {tabsOption.map((tab, index) => (
                    <Tab
                      key={index}
                      icon={tab.icon}
                      label={
                        <Grid container direction="column">
                          <Typography variant="subtitle1" color="inherit">
                            {tab.label}
                          </Typography>
                          <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                            {tab.caption}
                          </Typography>
                        </Grid>
                      }
                      {...a11yProps(index)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={9}>
              <CardContent
                sx={{
                  borderLeft: '1px solid',
                  borderColor: mode === ThemeMode.DARK ? 'background.default' : 'grey.200',
                  height: '100%'
                }}
              >
                <TabPanel value={value} index={0}>
                  <PersonalInformation />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ContactDetail />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Address />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <OtherDetail />
                </TabPanel>
              </CardContent>
            </Grid>
          </Grid>
          <Divider />
          <CardActions>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item>
                {value > 0 && (
                  <AnimateButton>
                    <Button variant="outlined" size="large" onClick={(e) => handleChange(e, value - 1)}>
                      Back
                    </Button>
                  </AnimateButton>
                )}
              </Grid>
              <Grid item>
                {value < 3 && (
                  <Stack spacing={1.5} direction="row">
                    <AnimateButton>
                      <Button variant="outlined" size="large">
                        Save
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <Button variant="contained" size="large" onClick={(e) => handleChange(e, 1 + value)}>
                        Continue
                      </Button>
                    </AnimateButton>
                  </Stack>
                )}
                {value === 3 && (
                  <AnimateButton>
                    <Button
                      variant="contained"
                      size="large"
                      {...(!isOpen && { component: Link, href: '/apps/invoice/client/client-list' })}
                      {...(isOpen && { onClick: handleDialogToggler })}
                    >
                      Save
                    </Button>
                  </AnimateButton>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
};

AddClient.propTypes = {
  isOpen: PropTypes.bool,
  handleDialogToggler: PropTypes.func
};

export default AddClient;
