'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';
// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import { ThemeMode } from 'config';

// assets
import { IconBrandFacebook, IconBrandYoutube, IconBrandTwitter } from '@tabler/icons-react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CandlestickChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  // Chart options
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      opposite: true,
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: '12px'
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      theme: theme.palette.mode
    },
    grid: {
      borderColor: theme.palette.divider
    }
  });

  // Candlestick series data
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Fetch data from API and update chart
    const fetchMarketData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/crypto/get-market');
        const data = await response.json();

        // Transform API data to match chart format
        const candlestickData = data?.data?.map((item) => ({
          x: moment(item.date).format('DD-MMM'), // Assuming the API provides `date`
          y: [item.open, item.high, item.low, item.close] // Assuming the API provides `open`, `high`, `low`, `close`
        }));

        setSeries([{ name: 'Candlestick Data', data: candlestickData }]);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, []);

  useEffect(() => {
    // Adjusting chart colors based on theme
    setOptions((prevOptions) => ({
      ...prevOptions,
      colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.error.main],
      stroke: {
        width: [1, 2, 2]
      }
    }));
  }, [theme]);

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h3">Market Overview</Typography>
            </Grid>
            <Grid item xs zeroMinWidth />
            <Grid item>
              <TrendingDownIcon fontSize="large" sx={{ mt: 1 }} color="error" />
            </Grid>
            <Grid item>
              <Typography variant="h3">27,695.65</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mt: -2.5, fontWeight: 400 }} color="inherit" variant="h5">
              Lorem ipsum dolor sit amet, consectetur
            </Typography>
          </Grid>
          {/* <Grid item container alignItems="center" spacing={3}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'secondary.main',
                      borderRadius: '12px',
                      padding: 1,
                      bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'secondary.light'
                    }}
                  >
                    <IconBrandFacebook stroke={1.5} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">+ 45.36%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'primary.main',
                      borderRadius: '12px',
                      padding: 1,
                      bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'primary.light'
                    }}
                  >
                    <IconBrandTwitter stroke={1.5} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">- 50.69%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'error.main',
                      borderRadius: '12px',
                      padding: 1,
                      bgcolor: mode === ThemeMode.DARK ? 'background.default' : alpha(theme.palette.error.light, 0.4)
                    }}
                  >
                    <IconBrandYoutube stroke={2} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">+ 16.85%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth />
          </Grid> */}
        </Grid>
      </Box>
      <ReactApexChart options={options} series={series} type="candlestick" height={400} />
    </MainCard>
  );
};

export default CandlestickChart;
