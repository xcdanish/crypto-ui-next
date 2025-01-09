'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import { ThemeMode } from 'config';

// assets
import { IconBrandFacebook, IconBrandYoutube, IconBrandTwitter } from '@tabler/icons-react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = {
  chart: {
    height: 400,
    type: 'area',
    id: 'market-share-area-chart',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 80, 100]
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    labels: {
      show: true,
      rotate: -45,
      hideOverlappingLabels: false, // Ensure all labels are visible
      style: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400
      }
    },
    tickAmount: 11 // Matches the number of categories
  },
  yaxis: {
    labels: {
      show: true,
      align: 'right',
      style: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400
      },
      offsetX: 15
    }
  },
  legend: {
    show: false
  },
  grid: {
    show: true,
    position: 'back',
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    },
    padding: {
      top: 40,
      right: 20,
      bottom: 40,
      left: 30
    }
  }
};

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const MarketShareAreaChartCard = () => {
  const theme = useTheme();

  const [series] = useState([
    {
      name: 'Youtube',
      data: [10, 90, 65, 85, 40, 80, 30, 50, 70, 20, 60, 40]
    },
    {
      name: 'Facebook',
      data: [50, 30, 25, 15, 60, 10, 25, 35, 45, 55, 20, 30]
    },
    {
      name: 'Twitter',
      data: [5, 50, 40, 55, 20, 40, 20, 30, 25, 35, 45, 15]
    }
  ]);

  const { mode } = useConfig();

  const secondaryMain = theme.palette.secondary.main;
  const errorMain = theme.palette.error.main;
  const primaryDark = theme.palette.primary.dark;

  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondaryMain, errorMain, primaryDark],
      tooltip: {
        theme: mode
      }
    }));
  }, [mode, secondaryMain, errorMain, primaryDark]);

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h3">Crypto Statistics</Typography>
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
          <Grid item container alignItems="center" spacing={3}>
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
          </Grid>
        </Grid>
      </Box>
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </MainCard>
  );
};

export default MarketShareAreaChartCard;
