'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// third-party
import { random } from 'lodash-es';
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import PaymentTable from './PaymentTable';
import AddClient from '../../Client/AddClient/index';
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';

import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getDetailCards } from 'store/slices/user';
import { openSnackbar } from 'store/slices/snackbar';
import { getInvoice } from 'store/slices/customer';
import { ThemeMode } from 'config';

// assets
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const validationSchema = yup.object({
  receiptID: yup.string().required('Receipt ID is Required'),
  amount: yup.string().required('Received Amount is Required')
});

function getRandomRow(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

// ==============================|| ADD PAYMENT ||============================== //

const AddPayment = () => {
  const theme = useTheme();
  const router = useRouter();

  const { detailCards } = useSelector((state) => state.user);
  const { invoices } = useSelector((state) => state.customer);

  const [value, setValue] = useState(dayjs('2022-04-17'));
  const [client, setClient] = useState([]);
  const [data, setData] = useState('');
  const [row, setRow] = useState([]);
  const [select, setSelect] = useState('');

  // open dialog to edit review
  const [open, setOpen] = useState(false);

  const handleDialogToggler = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      receiptID: '',
      amount: ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Submit Success',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        router.push('/apps/invoice/payment/payment-list');
      }
    }
  });

  const handleChangeClient = (e) => {
    setData(e.target.value);
    setRow(e.target.value ? getRandomRow(invoices, random(1, 5)) : []);
  };

  useEffect(() => {
    setClient(detailCards);
  }, [detailCards]);

  useEffect(() => {
    dispatch(getInvoice());
    dispatch(getDetailCards());
  }, []);

  const handleChangeMethod = (event) => {
    setSelect(event.target.value);
  };

  return (
    <MainCard
      title="Add New Payment Received"
      sx={{
        '& .MuiOutlinedInput-input': { borderRadius: 1.5 },
        '& .MuiCardContent-root': { p: 0 },
        '.MuiCardContent-root:last-child': { paddingBottom: '0px' }
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* add payment header */}
        <Box sx={{ p: 2.5, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'primary.light' }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={8} md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Client</InputLabel>
                <Select
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={handleDialogToggler} startIcon={<AddIcon />}>
                        New client
                      </Button>
                    </InputAdornment>
                  }
                  sx={{ '& .MuiSelect-icon': { right: 120 } }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Client"
                  onChange={handleChangeClient}
                  value={data}
                >
                  <MenuItem value="">Select Client</MenuItem>
                  {client.map((item, index) => (
                    <MenuItem value={index} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Payment Receipt ID"
                id="receiptID"
                name="receiptID"
                value={formik.values.receiptID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.receiptID && Boolean(formik.errors.receiptID)}
                helperText={formik.touched.receiptID && formik.errors.receiptID}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ display: { xs: 'none', sm: 'flex' } }} />
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Payment Method"
                  value={select}
                  onChange={handleChangeMethod}
                  placeholder="Enter Amount"
                >
                  <MenuItem value="">Select Payment Method</MenuItem>
                  <MenuItem value={1}>Cash</MenuItem>
                  <MenuItem value={2}>Credit Card</MenuItem>
                  <MenuItem value={3}>Master Card</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                sx={{ border: 'none' }}
                label="Received Amount"
                fullWidth
                id="amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                placeholder="Enter Amount"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }} />
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Reference" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { fullWidth: true } }}
                  label="Create Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        {/* payment drawer */}
        <Dialog open={open} onClose={handleDialogToggler} sx={{ '& .MuiDialog-paper': { maxWidth: '100%', width: 980 } }}>
          {open && <AddClient isOpen handleDialogToggler={handleDialogToggler} />}
        </Dialog>

        {/* add payment table */}
        <PaymentTable {...{ formik, row }} />
        <Divider />
        <Box sx={{ p: 2.5 }}>
          <TextField fullWidth multiline rows={2} label="Add Note" />
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between">
            <Stack justifyContent="flex-start">
              <AnimateButton>
                <Button
                  variant="contained"
                  startIcon={<CheckIcon />}
                  size="large"
                  sx={{
                    ml: 2,
                    textDecoration: 'none'
                  }}
                  type="submit"
                >
                  Save & View Receipt
                </Button>
              </AnimateButton>
            </Stack>
            <Stack direction="row" spacing={1.5} justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" size="large" type="submit">
                  Save
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button variant="outlined" component={Link} href="/apps/invoice/payment/payment-list" size="large">
                  Cancel
                </Button>
              </AnimateButton>
            </Stack>
          </Stack>
        </CardActions>
      </form>
    </MainCard>
  );
};

export default AddPayment;
