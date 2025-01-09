'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import InputLabel from 'components/ui-component/extended/Form/InputLabel';

import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getProducts } from 'store/slices/product';

// ==============================|| CREATE INVOICE - SELECT ITEM ||============================== //

function SelectItem({ handleAddItem, setAddItemClicked }) {
  const [selectedItem, setSelectedItem] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({ quantityError: '' });

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    setRows(products);
  }, [products]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (selectedItem?.id) {
      setAmount(selectedItem?.offerPrice * selectedQuantity);
    }
  }, [selectedQuantity, selectedItem]);

  const handleAddInvoiceItem = (event) => {
    const value = event.target.value;
    if (event.target.name === 'quantity') {
      if (Number(value) < 0) {
        setErrors({
          ...errors,
          quantityError: 'negative values not allowed'
        });
        setSelectedQuantity(value);
      } else if (Number(value) === 0) {
        setErrors({
          ...errors,
          quantityError: 'quantity can not be zero'
        });
        setSelectedQuantity(value);
      } else {
        setSelectedQuantity(value);
        setErrors({
          ...errors,
          quantityError: ''
        });
      }
    } else {
      const selectedOption = rows.find((item) => item.id === value);
      setSelectedItem(selectedOption);
    }
  };

  const handleOnAddItem = () => {
    const data = {
      ...selectedItem,
      totalAmount: amount,
      selectedQuantity
    };

    handleAddItem(data);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4}>
        <Stack spacing={1}>
          <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Item Name</InputLabel>
          <FormControl>
            <Select
              fullWidth
              displayEmpty
              value={selectedItem?.id || ''}
              onChange={handleAddInvoiceItem}
              input={<OutlinedInput />}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                <Typography color="textSecondary">Select Item</Typography>
              </MenuItem>
              {rows.map((item, i) => (
                <MenuItem key={i} value={item.id}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography>Rate : {item.offerPrice}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1}>
          <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Quantity</InputLabel>
          <TextField
            fullWidth
            type="number"
            name="quantity"
            value={selectedQuantity}
            onChange={handleAddInvoiceItem}
            error={Boolean(errors.quantityError)}
            helperText={errors.quantityError}
            disabled={!selectedItem?.id}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1}>
          <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Amount</InputLabel>
          <TextField fullWidth name="amount" value={Math.round(amount * 100) / 100} disabled />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
          <Button color="error" onClick={() => setAddItemClicked(false)}>
            Cancel
          </Button>
          <Button disabled={!selectedItem?.id || !selectedQuantity} variant="contained" size="small" onClick={handleOnAddItem}>
            Add
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

SelectItem.propTypes = {
  handleAddItem: PropTypes.func,
  setAddItemClicked: PropTypes.func
};

export default SelectItem;
