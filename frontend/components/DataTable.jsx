import React from 'react';
import './DataTable.css';

const DataTable = ({ data, location, deviceType }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const renderTableHeaders = () => {
    switch (deviceType) {
      case 'DataLogger':
        return (
          <tr>
            <th>Serial No.</th>
            <th>Date</th>
            <th>Location</th>
            <th>Nin</th>
            <th>PV</th>
            <th>PU</th>
            <th>AL</th>
          </tr>
        );
      case 'Pressure':
        return (
          <tr>
            <th>Device No.</th>
            <th>Date</th>
            <th>Location</th>
            <th>Pressure Value</th>
            <th>Alarms</th>
            <th>Network Info</th>
            <th>snr</th>
          </tr>
        );
      case 'Chlorin Analyzer':
        return (
          <tr>
            <th>Device No.</th>
            <th>Date</th>
            <th>Location</th>
            <th>Chlorine Level</th>
            <th>Chlorine Unit</th>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="no-data">No data to display</td>
        </tr>
      );
    }

    return data.map((entry, index) => {
      if (entry.Location === location) {
        switch (deviceType) {
          case 'DataLogger':
            return (
              <tr key={index}>
                <td>{entry.sn}</td>
                <td>{formatDate(entry.nts)}</td>
                <td>{entry.Location}</td>
                <td>{entry.nin}</td>
                <td>{entry.dp_pv}</td>
                <td>{entry.dp_pu}</td>
                <td>{entry.dp_al}</td>
              </tr>
            );
          case 'Pressure':
            return (
              <tr key={index}>
                <td>{entry.device_no}</td>
                <td>{formatDate(entry.network_ts)}</td>
                <td>{entry.Location}</td>
                <td>{entry.pressure_value}</td>
                <td>{entry.alarms}</td>
                <td>{entry.network_info}</td>
                <td>{entry.snr}</td>
              </tr>
            );
          case 'Chlorin Analyzer':
            return (
              <tr key={index}>
                <td>{entry.device_no}</td>
                <td>{formatDate(entry.timestamp)}</td>
                <td>{entry.Location}</td>
                <td>{entry.chlorine_level}</td>
                <td>{entry.chlorine_unit}</td>
              </tr>
            );
          default:
            return null;
        }
      }
      return null;
    });
  };

  return (
    <table className="table table-striped">
      <thead>
        {renderTableHeaders()}
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </table>
  );
};

export default DataTable;
