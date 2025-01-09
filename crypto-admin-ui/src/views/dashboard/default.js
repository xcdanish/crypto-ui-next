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
import CandlestickChart from 'components/dashboard/Analytics/CandlestickChart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
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
    </Grid>
  );
};

export default Dashboard;
