import React from 'react';
import { Line } from "react-chartjs-2";

const ChartSection = ({ chartData }) => {
  return (
    <div className="chart-container">
      <Line data={chartData} />
    </div>
  );
};

export default ChartSection;
