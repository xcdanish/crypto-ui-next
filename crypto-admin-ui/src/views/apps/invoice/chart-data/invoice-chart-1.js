// ==============================|| DASHBOARD - INVOICE 1 CHART ||============================== //

const chartData = {
  type: 'line',
  height: 30,
  options: {
    chart: {
      id: 'user-analytics-chart',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    yaxis: {
      min: -2,
      max: 5,
      labels: {
        show: false
      }
    },
    colors: ['#757575', '#757575'],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'New '
        }
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      data: [2, 1, 2, 1, 1, 3, 0]
    }
  ]
};
export default chartData;
