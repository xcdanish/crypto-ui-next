'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import Cart from 'components/application/e-commerce/Checkout/Cart';
import Payment from 'components/application/e-commerce/Checkout/Payment';
import CartEmpty from 'components/application/e-commerce/Checkout/CartEmpty';
import BillingAddress from 'components/application/e-commerce/Checkout/BillingAddress';

import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { getAddresses, editAddress, addAddress } from 'store/slices/product';
import { removeProduct, setBackStep, setBillingAddress, setNextStep, setShippingCharge, setStep, updateProduct } from 'store/slices/cart';
import { ThemeMode } from 'config';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';

// tabs option
const tabsOption = [
  {
    label: 'User Profile',
    icon: <ShoppingCartTwoToneIcon />,
    caption: 'Product Added'
  },
  {
    label: 'Billing Address',
    icon: <ApartmentIcon />,
    caption: 'Billing Information'
  },
  {
    label: 'Payment',
    icon: <CreditCardTwoToneIcon />,
    caption: 'Add & Update Card'
  }
];

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
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { mode, borderRadius } = useConfig();

  const isCart = cart.checkout.products && cart.checkout.products.length > 0;

  const [value, setValue] = useState(cart.checkout.step > 2 ? 2 : cart.checkout.step);
  const [billing, setBilling] = useState(cart.checkout.billing);
  const [address, setAddress] = useState([]);
  const { addresses } = useSelector((state) => state.product);

  useEffect(() => {
    setAddress(addresses);
  }, [addresses]);

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  const addBillingAddress = (addressNew) => {
    dispatch(addAddress(addressNew));
  };

  const editBillingAddress = (addressEdit) => {
    dispatch(editAddress(addressEdit));
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    dispatch(setStep(newValue));
  };

  useEffect(() => {
    setValue(cart.checkout.step > 2 ? 2 : cart.checkout.step);
  }, [cart.checkout.step]);

  const removeCartProduct = (id) => {
    dispatch(removeProduct(id, cart.checkout.products));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Update Cart Success',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };

  const updateQuantity = (id, quantity) => {
    dispatch(updateProduct(id, quantity, cart.checkout.products));
  };

  const onNext = () => {
    dispatch(setNextStep());
  };

  const onBack = () => {
    dispatch(setBackStep());
  };

  const billingAddressHandler = (addressBilling) => {
    if (billing !== null || addressBilling !== null) {
      if (addressBilling !== null) {
        setBilling(addressBilling);
      }

      dispatch(setBillingAddress(addressBilling !== null ? addressBilling : billing));
      onNext();
    } else {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Please select delivery address',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };

  const handleShippingCharge = (type) => {
    dispatch(setShippingCharge(type, cart.checkout.shipping));
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={(e, newValue) => handleChange(newValue)}
            aria-label="icon label tabs example"
            variant="scrollable"
            sx={{
              '& .MuiTabs-flexContainer': {
                borderBottom: 'none'
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              },
              '& .MuiButtonBase-root + .MuiButtonBase-root': {
                position: 'relative',
                overflow: 'visible',
                ml: 2,
                '&:after': {
                  content: '""',
                  bgcolor: '#ccc',
                  width: 1,
                  height: 'calc(100% - 16px)',
                  position: 'absolute',
                  top: 8,
                  left: -8
                }
              }
            }}
          >
            {tabsOption.map((tab, index) => (
              <Tab
                value={index}
                disabled={index > cart.checkout.step}
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
                sx={{
                  color: cart.checkout.step >= value ? 'success.dark' : 'grey.900',
                  minHeight: 'auto',
                  minWidth: { xs: '100%', md: 250 },
                  padding: 2,
                  borderRadius: `${borderRadius}px`,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  '&:after': {
                    bgcolor: 'transparent !important'
                  },
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                  },
                  '& > svg': {
                    marginBottom: '0px !important',
                    mr: 1.25,
                    mt: 0.25,
                    height: 20,
                    width: 20
                  }
                }}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            {isCart && <Cart checkout={cart.checkout} onNext={onNext} removeProduct={removeCartProduct} updateQuantity={updateQuantity} />}
            {!isCart && <CartEmpty />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BillingAddress
              checkout={cart.checkout}
              onBack={onBack}
              billingAddressHandler={billingAddressHandler}
              address={address}
              addAddress={addBillingAddress}
              editAddress={editBillingAddress}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Payment checkout={cart.checkout} onBack={onBack} onNext={onNext} handleShippingCharge={handleShippingCharge} />
          </TabPanel>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Checkout;
