import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

// assets
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// =========================|| CONVERSIONS CHART CARD ||========================= //

const ConversionsChartCard = ({ chartData }) => (
  <MainCard content={false}>
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">New Stock</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">(Purchased)</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4">0.85%</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems="center" sx={{ color: 'info.main' }}>
            <ArrowUpwardIcon color="inherit" />
            <Typography variant="h4" color="inherit">
              0.50%
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type={chartData.options?.chart?.type}
      height={chartData.options?.chart?.height}
    />
  </MainCard>
);

ConversionsChartCard.propTypes = {
  chartData: PropTypes.object
};

export default ConversionsChartCard;
