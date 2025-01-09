'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import ClientInfo from './ClientInfo';
import ItemList from './ItemList';
import AmountCard from './AmountCard';
import SelectItem from './SelectItem';
import InputLabel from 'components/ui-component/extended/Form/InputLabel';
import MainCard from 'components/ui-component/cards/MainCard';

import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// yup validation-schema
const validationSchema = yup.object({
  invoiceNumber: yup.string().required('Invoice Number is Required'),
  customerName: yup.string().required('Client Name is Required'),
  customerEmail: yup.string().email('Enter a valid email').required('Client Email is Required'),
  customerPhone: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Client Phone is Required'),
  customerAddress: yup.string().required('Client Address is Required'),
  orderStatus: yup.string().required('Order Status is required')
});

// ==============================|| CREATE INVOICE ||============================== //

function CreateInvoice() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [allAmounts, setAllAmounts] = useState({
    subTotal: 0,
    appliedTaxValue: 0.1,
    appliedDiscountValue: 0.05,
    taxesAmount: 0,
    discountAmount: 0,
    totalAmount: 0
  });
  const [productsData, setProductsData] = useState([]);
  const [addItemClicked, setAddItemClicked] = useState(true);
  const [fieldValue, setFieldValue] = useState();

  // to delete row in order details
  const deleteProductHandler = (id) => {
    setProductsData(productsData.filter((item) => item.id !== id));
  };

  const handleOnSelectValue = (value) => {
    const id = Math.floor(Math.random() * 100000);
    setFieldValue({ ...value, id });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      invoiceNumber: fieldValue ? fieldValue?.id : '#58963',
      customerName: fieldValue ? fieldValue?.name : '',
      customerEmail: fieldValue ? fieldValue?.email : '',
      customerPhone: fieldValue ? fieldValue?.contact : '',
      customerAddress: fieldValue ? fieldValue?.location : '',
      orderStatus: 'pending'
    },

    validationSchema,
    onSubmit: (values) => {
      if (values) {
        router.push('/apps/invoice/invoice-list');
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
      }
    }
  });

  useEffect(() => {
    const amounts = {
      subTotal: 0,
      appliedTaxValue: 0.1,
      appliedDiscountValue: 0.05,
      taxesAmount: 0,
      discountAmount: 0,
      totalAmount: 0
    };
    productsData.forEach((item) => {
      amounts.subTotal += item.total;
    });
    amounts.taxesAmount = amounts.subTotal * amounts.appliedTaxValue;
    amounts.discountAmount = (amounts.subTotal + amounts.taxesAmount) * amounts.appliedDiscountValue;
    amounts.totalAmount = amounts.subTotal + amounts.taxesAmount - amounts.discountAmount;
    setAllAmounts(amounts);
  }, [productsData]);

  // add item handler
  const handleAddItem = (addingData) => {
    setProductsData([
      ...productsData,
      {
        id: addingData.id,
        product: addingData.name,
        description: addingData.description,
        quantity: addingData.selectedQuantity,
        amount: addingData.offerPrice,
        total: addingData.totalAmount
      }
    ]);

    setAddItemClicked(false);
  };

  return (
    <MainCard title="Create Invoice">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={gridSpacing}>
          {/* client info */}
          <ClientInfo {...{ formik, handleOnSelectValue }} />

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* item list page */}
          {productsData.length > 0 && (
            <Grid item xs={12}>
              <ItemList {...{ productsData, deleteProductHandler }} />
            </Grid>
          )}

          {addItemClicked ? (
            <Grid item xs={12}>
              {/* select item page */}
              <SelectItem {...{ handleAddItem, setAddItemClicked }} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Button variant="text" onClick={() => setAddItemClicked(true)}>
                + Add Item
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* total card */}
          <Grid item xs={12}>
            <AmountCard {...{ allAmounts }} />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Stack>
              <InputLabel required>Terms and Condition:</InputLabel>
              <TextField
                fullWidth
                id="customerAddress"
                name="customerAddress"
                defaultValue="I acknowledge terms and conditions."
                multiline
                placeholder="Enter Address"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit">
              Add Invoice
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}

export default CreateInvoice;
