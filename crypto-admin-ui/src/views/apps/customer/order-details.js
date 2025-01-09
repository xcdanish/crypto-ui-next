'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import Details from 'components/application/customer/OrderDetails/Details';
import Invoice from 'components/application/customer/OrderDetails/Invoice';
import Status from 'components/application/customer/OrderDetails/Status';
import MainCard from 'components/ui-component/cards/MainCard';
import { ThemeMode } from 'config';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';

// tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| ORDER DETAILS ||============================== //

const OrderDetails = () => {
  const theme = useTheme();

  // set selected tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="scrollable"
        aria-label="simple tabs example"
        sx={{
          '& a': {
            minHeight: 'auto',
            minWidth: 10,
            px: 1,
            py: 1.5,
            mr: 2.25,
            color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& a.Mui-selected': {
            color: 'primary.main'
          },
          '& a > svg': {
            marginBottom: '0px !important',
            marginRight: 1.25
          },
          mb: 3
        }}
      >
        <Tab icon={<DescriptionTwoToneIcon />} component={Link} href="#" label="Details" {...a11yProps(0)} />
        <Tab icon={<ReceiptTwoToneIcon />} component={Link} href="#" label="Invoice" {...a11yProps(1)} />
        <Tab icon={<LocalShippingTwoToneIcon />} component={Link} href="#" label="Status" {...a11yProps(2)} />
      </Tabs>

      {/* tab - details */}
      <TabPanel value={value} index={0}>
        <Details />
      </TabPanel>

      {/* tab - invoice */}
      <TabPanel value={value} index={1}>
        <Invoice />
      </TabPanel>

      {/* tab - status */}
      <TabPanel value={value} index={2}>
        <Status />
      </TabPanel>
    </MainCard>
  );
};

export default OrderDetails;
