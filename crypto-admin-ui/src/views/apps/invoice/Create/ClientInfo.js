'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// project imports
import AddClient from '../Client/AddClient';

import { dispatch, useSelector } from 'store';
import { getDetailCards } from 'store/slices/user';

// assets
import AddIcon from '@mui/icons-material/Add';

// ==============================|| CLIENT INFO ||============================== //

const ClientInfo = ({ formik, handleOnSelectValue }) => {
  const [data, setData] = useState('');
  const [client, setClient] = useState([]);
  const [open, setOpen] = useState(false);
  const [valueBasic, setValueBasic] = useState(new Date());

  const { detailCards } = useSelector((state) => state.user);

  const handleDialogToggler = () => {
    setOpen(!open);
  };

  const handleSelectClient = (e) => {
    setData(e.target.value);
  };

  useEffect(() => {
    setClient(detailCards);
  }, [detailCards]);

  useEffect(() => {
    dispatch(getDetailCards());
  }, []);

  return (
    <>
      <Grid item xs={12} md={4}>
        <InputLabel required sx={{ color: 'grey.500', fontWeight: '400' }}>
          Invoice Number
        </InputLabel>
        <TextField
          id="invoiceNumber"
          name="invoiceNumber"
          value={formik.values.invoiceNumber}
          onBlur={formik.handleBlur}
          error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
          helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
          onChange={formik.handleChange}
          fullWidth
          placeholder="Invoice #"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack>
          <InputLabel id="demo-simple-select-label">Select Client</InputLabel>
          <Select
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={handleDialogToggler} startIcon={<AddIcon />}>
                  New client
                </Button>
              </InputAdornment>
            }
            defaultValue=""
            sx={{ '& .MuiSelect-icon': { right: 120 } }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Client"
            onChange={handleSelectClient}
            value={data}
          >
            <MenuItem value="">Select Client</MenuItem>
            {client.map((item, index) => (
              <MenuItem value={index} onClick={() => handleOnSelectValue(item)} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack>
          <InputLabel required>Client Name</InputLabel>
          <TextField
            fullWidth
            id="customerName"
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customerName && Boolean(formik.errors.customerName)}
            helperText={formik.touched.customerName && formik.errors.customerName}
            placeholder="Alex Z."
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack>
          <InputLabel required>Client Email</InputLabel>
          <TextField
            type="email"
            fullWidth
            id="customerEmail"
            name="customerEmail"
            value={formik.values.customerEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
            helperText={formik.touched.customerEmail && formik.errors.customerEmail}
            placeholder="alex@company.com"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack>
          <InputLabel required>Client Contact Numer</InputLabel>
          <TextField
            fullWidth
            id="customerPhone"
            name="customerPhone"
            value={formik.values.customerPhone}
            onBlur={formik.handleBlur}
            error={formik.touched.customerPhone && Boolean(formik.errors.customerPhone)}
            helperText={formik.touched.customerPhone && formik.errors.customerPhone}
            onChange={formik.handleChange}
            placeholder="+ 00 00000 00000"
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <InputLabel required>Client Address</InputLabel>
          <TextField
            fullWidth
            id="customerAddress"
            name="customerAddress"
            value={formik.values.customerAddress}
            onBlur={formik.handleBlur}
            error={formik.touched.customerAddress && Boolean(formik.errors.customerAddress)}
            helperText={formik.touched.customerAddress && formik.errors.customerAddress}
            onChange={formik.handleChange}
            multiline
            placeholder="Enter Address"
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <InputLabel required>Invoice Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              format="dd/MM/yyyy"
              slotProps={{ textField: { fullWidth: true } }}
              value={valueBasic}
              onChange={(newValue) => {
                setValueBasic(newValue);
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <InputLabel required>Status</InputLabel>
          <Select
            id="orderStatus"
            name="orderStatus"
            defaultValue={formik.values.orderStatus}
            value={formik.values.orderStatus}
            onChange={formik.handleChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="refund">Refund</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
          {formik.errors.orderStatus && <FormHelperText error>{formik.errors.orderStatus}</FormHelperText>}
        </Stack>
      </Grid>
      <Dialog open={open} onClose={handleDialogToggler} sx={{ '& .MuiDialog-paper': { maxWidth: '100%', width: 980 } }}>
        {open && <AddClient isOpen handleDialogToggler={handleDialogToggler} />}
      </Dialog>
    </>
  );
};

ClientInfo.propTypes = {
  formik: PropTypes.object,
  handleOnSelectValue: PropTypes.func
};

export default ClientInfo;
