'use client';

import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from 'components/dashboard/Default/EarningCard';
import PopularCard from 'components/dashboard/Default/PopularCard';
import TotalOrderLineChartCard from 'components/dashboard/Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from 'components/ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'components/ui-component/cards/TotalIncomeLightCard';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import SecoundBarChart from 'components/dashboard/Default/SecoundBarChart';
import WarningBarChart from 'components/dashboard/Default/WarningBarChart';
import GrayBarChart from 'components/dashboard/Default/GrayBarChart';
import MixedChart from 'components/dashboard/ChartsComponent/MixedChart';
import MarketShareAreaChartCard from 'components/dashboard/Analytics/MarketShareAreaChartCard';
import CandlestickChart from 'components/dashboard/ChartsComponent/CandlestickChart';
import OrderBook from 'components/dashboard/Default/OrderBook';
import QuickTransfer from 'components/dashboard/Default/QuickTransfer';
import { GetCoinDataApi, GetOrderApi } from 'store/slices/cryptoAction';
import { dispatch, useSelector } from 'store';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { getOrder, getOrderLoading } = useSelector((state) => state.cryptoData);

  const sellData = [
    { price: 82.3, amount: 0.15, total: 134.12 },
    { price: 83.9, amount: 0.18, total: 237.31 },
    { price: 84.2, amount: 0.25, total: 252.58 },
    { price: 86.2, amount: 0.35, total: 126.26 },
    { price: 91.6, amount: 0.75, total: 46.92 },
    { price: 92.6, amount: 0.21, total: 123.27 },
    { price: 93.9, amount: 0.55, total: 212.56 },
    { price: 94.2, amount: 0.2, total: 129.26 },
    { price: 96.5, amount: 0.3, total: 150.75 },
    { price: 98.0, amount: 0.4, total: 172.4 }
  ];

  const buyData = [
    { price: 86.2, amount: 0.35, total: 126.26 },
    { price: 83.9, amount: 0.18, total: 237.31 },
    { price: 93.9, amount: 0.55, total: 212.56 },
    { price: 94.2, amount: 0.2, total: 129.26 },
    { price: 91.6, amount: 0.75, total: 46.92 },
    { price: 88.5, amount: 0.4, total: 135.25 },
    { price: 87.0, amount: 0.5, total: 156.75 },
    { price: 89.0, amount: 0.6, total: 175.5 },
    { price: 90.2, amount: 0.3, total: 145.1 },
    { price: 92.8, amount: 0.45, total: 160.1 }
  ];

  useEffect(() => {
    setLoading(false);
    dispatch(GetCoinDataApi()); // bitcoin
    dispatch(GetOrderApi()); // bitcoin
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <GrayBarChart isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <WarningBarChart isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <SecoundBarChart isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            {/* <MixedChart isLoading={isLoading} /> */}
            <MarketShareAreaChartCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CandlestickChart isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <QuickTransfer />
      </Grid>
      <Grid item xs={12} md={3}>
        <OrderBook
          title="Sell Order"
          defaultCoin="Dash Coin"
          coinOptions={['Dash Coin', 'Other Coin']}
          data={getOrder?.buyOrders ? getOrder?.buyOrders : sellData}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <OrderBook
          title="Buy Order"
          defaultCoin="Bitcoin"
          coinOptions={['Bitcoin', 'Other Coin']}
          data={getOrder?.buyOrders ? getOrder?.buyOrders : buyData}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
