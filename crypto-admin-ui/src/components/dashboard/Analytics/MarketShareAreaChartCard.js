'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { dispatch, useSelector } from 'store';
// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';
import { ThemeMode } from 'config';

// assets
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MarketShareAreaChartCard = () => {
  const theme = useTheme();
  const { mode } = useConfig();
  const { getCryptoCoinGraph, getCryptoCoinGraphLoading } = useSelector((state) => state.cryptoData);
 
  // console.log('🚀 ~ Dashboard ~ getCryptoCoinGraph:', getCryptoCoinGraph);
  // State for selected graph and chart options
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 400,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
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
      categories: [],
      labels: {
        show: true,
        rotate: -45,
        style: {
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400
        }
      }
    },
    legend: {
      show: false
    },
    grid: {
      show: true,
      position: 'back',
      padding: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 30
      }
    }
  });

  // Set the default graph data on initial render

  // Update chart data and categories dynamically
  const updateGraph = (graphData) => {
    console.log('🚀 graphData:', graphData);
    setSeries([
      {
        name: graphData._id,
        data: graphData.data.map((item) => item.amount)
      }
    ]);
    setCategories(graphData.data.map((item) => item.date));
  };

  useEffect(() => {
    if (getCryptoCoinGraph && getCryptoCoinGraph.length > 0) {
      const defaultGraph = getCryptoCoinGraph[0];
      updateGraph(defaultGraph);
    }
  }, [getCryptoCoinGraph]);

  // Update chart options when categories or theme changes
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories
      },
      colors: [theme.palette.secondary.main, theme.palette.error.main, theme.palette.primary.dark],
      tooltip: {
        theme: mode
      }
    }));
  }, [categories, theme, mode]);

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box sx={{ p: 3 }}>
        <Grid container direction="column" spacing={3}>
          {/* Header Section */}
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

          {/* Subheader Section */}
          <Grid item xs={12}>
            <Typography sx={{ mt: -2.5, fontWeight: 400 }} color="inherit" variant="h5">
              Analyze the performance of different cryptocurrencies over time.
            </Typography>
          </Grid>

          {/* Button Listing */}
          <Grid item container alignItems="center" spacing={3}>
            {getCryptoCoinGraph?.map((item, i) => (
              <Grid item key={i}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        // width: 40,
                        height: 40,
                        color: 'secondary.main',
                        borderRadius: '12px',
                        padding: 1,
                        bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'secondary.light',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                      onClick={() => updateGraph(item)}
                    >
                      {item?._id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs zeroMinWidth />
          </Grid>
        </Grid>
      </Box>

      {/* Chart */}
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </MainCard>
  );
};

export default MarketShareAreaChartCard;
