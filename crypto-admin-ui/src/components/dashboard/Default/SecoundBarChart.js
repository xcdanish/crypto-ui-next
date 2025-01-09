'use client';

import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'components/ui-component/cards/Skeleton/EarningCard';
import { ThemeMode } from 'config';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = {
  chart: {
    type: 'line',
    height: 90,
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#fff'],
  fill: {
    type: 'solid',
    opacity: 1
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  yaxis: {
    min: 0,
    max: 100
  },
  tooltip: {
    theme: 'dark',
    fixed: {
      enabled: false
    },
    x: {
      show: false
    },
    y: {
      title: {
        formatter: () => 'Total Order'
      }
    },
    marker: {
      show: false
    }
  }
};

const SecoundBarChart = ({ isLoading }) => {
  const theme = useTheme();

  const yearSeries = [
    {
      name: 'series1',
      data: [35, 44, 9, 54, 45, 66, 41, 69, 25, 50, 35, 80]
    }
  ];

  const monthSeries = [
    {
      name: 'series1',
      data: [45, 66, 41, 89, 25, 44, 9]
    }
  ];

  const [series, setSeries] = React.useState(yearSeries);

  const [timeValue, setTimeValue] = React.useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
    setSeries(timeValue ? yearSeries : monthSeries);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '15px',
            '&>div': {
              position: 'relative',
              zIndex: 5
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background:
                theme.palette.mode === ThemeMode.DARK
                  ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                  : theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              zIndex: 1,
              width: 210,
              height: 210,
              background:
                theme.palette.mode === ThemeMode.DARK
                  ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                  : theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <ArrowDropUpIcon sx={{ color: 'success.light' }} /> Total Order
                    </Typography>

                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mb: 0.75 }}>$65,123</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.800',
                        color: '#fff'
                        // mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <ReactApexChart options={chartOptions} series={series} type="line" height={90} />
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

SecoundBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default SecoundBarChart;
