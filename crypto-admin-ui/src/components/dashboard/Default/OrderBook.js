/* eslint-disable react/prop-types */
import React from 'react';
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import MainCard from 'components/ui-component/cards/MainCard';

// OrderTable Component
const OrderTable = ({ data }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Price</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// OrderCard Component
const OrderBook = ({ title, defaultCoin, coinOptions, data }) => (
  <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Select fullWidth defaultValue={defaultCoin}>
          {coinOptions.map((coin, index) => (
            <MenuItem key={index} value={coin}>
              {coin}
            </MenuItem>
          ))}
        </Select>
        <OrderTable data={data} />
      </CardContent>
    </Card>
  </MainCard>
);

// OrderBook Component
// const OrderBook = () => {
//   const sellData = [
//     { price: 83.9, amount: 0.18, total: 237.31 },
//     { price: 82.3, amount: 0.15, total: 134.12 },
//     { price: 84.2, amount: 0.25, total: 525.58 }
//   ];

//   const buyData = [
//     { price: 86.2, amount: 0.35, total: 126.26 },
//     { price: 93.9, amount: 0.55, total: 212.56 },
//     { price: 83.9, amount: 0.18, total: 237.31 }
//   ];

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={6}>
//           <OrderCard title="Sell Order" defaultCoin="Dash Coin" coinOptions={['Dash Coin', 'Other Coin']} data={sellData} />
//       </Grid>
//       <Grid item xs={6}>
//           <OrderCard title="Buy Order" defaultCoin="Bitcoin" coinOptions={['Bitcoin', 'Other Coin']} data={buyData} />
//       </Grid>
//     </Grid>
//   );
// };

export default OrderBook;
