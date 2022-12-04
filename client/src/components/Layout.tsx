import * as React from 'react';
import Box from '@mui/material/Box';
import ReactECharts from 'echarts-for-react';

type Props = {};

export const Layout = (props: Props) => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ReactECharts option={options} />
    </Box>
  );
};
