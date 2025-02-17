'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import useConfig from 'hooks/useConfig';
import value from 'scss/_themes-vars.module.scss';

// third-party
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// chart options
const areaChartOptions = {
  chart: {
    height: 350,
    type: 'area'
  },
  colors: [value.secondaryMain, value.primaryMain],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z'
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  },
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    position: 'bottom',
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  }
};

// ==============================|| AREA CHART ||============================== //

const ApexAreaChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const divider = theme.palette.divider;

  const [series] = useState([
    {
      name: 'Series 1',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Series 2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ]);

  const [options, setOptions] = useState(areaChartOptions);
  React.useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.secondary.main, theme.palette.primary.main],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: divider
      },
      tooltip: {
        theme: mode
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [mode, primary, darkLight, divider, theme]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ApexAreaChart;
