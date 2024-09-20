import React from 'react';
import './DataTable.css';

const DataTable = ({ data, location }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Serial No.</th>
          <th>Date</th>
          <th>Location</th>
          <th>Nin</th>
          <th>PV</th>
          <th>PU</th>
          <th>AL</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((entry, index) => {
            if (entry.Location === location) {
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
            }
            return null;
          })
        ) : (
          <tr>
            <td colSpan="7" className="no-data">No data to display</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
