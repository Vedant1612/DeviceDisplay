import React from 'react';
import './AnalyticsSection.css'; // Ensure this CSS file is created

const AnalyticsSection = ({ data }) => {
  // Calculate average value if there's data available
  const averageValue = data.length > 0 
    ? (data.reduce((acc, item) => acc + item.value, 0) / data.length).toFixed(2) 
    : 0;
  
  // Find maximum value from the data
  const maxValue = data.length > 0 
    ? Math.max(...data.map(item => item.value)) 
    : 0;

  return (
    <div className="analytics-section">
      <div className="analytics-card">
        <h4 className="card-title">Average Value</h4>
        <p className="analytics-value">{averageValue}</p>
      </div>
      <div className="analytics-card">
        <h4 className="card-title">Maximum Value</h4>
        <p className="analytics-value">{maxValue}</p>
      </div>
    </div>
  );
};

export default AnalyticsSection;
