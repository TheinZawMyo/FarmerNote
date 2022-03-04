import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import COLORS from '../consts/Colors';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => COLORS.white, // optional
      strokeWidth: 1, // optional
    },
  ],
  legend: ['ကုန်ကျစရိတ်ပြဇယား'], // optional
};

const chartConfig = {
  backgroundColor: COLORS.green,
  backgroundGradientFrom: COLORS.green,
  backgroundGradientTo: COLORS.green,
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#08130D',
  //   backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const LineChartComponent = () => {
  return (
    <LineChart
      data={data}
      width={screenWidth - 55}
      height={180}
      chartConfig={chartConfig}
    />
  );
};

export default LineChartComponent;
