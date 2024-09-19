import React from 'react';
import './DataCard.css'; // Ensure you have this CSS file for styling

const DataCard = ({ data }) => {
  // Convert UNIX timestamp to a JavaScript Date object
  const date = new Date(data.nts * 1000); // UNIX timestamp is in seconds, so multiply by 1000

  // Format the date as desired (e.g., "dd/MM/yyyy HH:mm:ss")
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

  return (
    <div className="data-card">
      <div className="card-header">
        <h3 className="card-title">{data.type}</h3>
        <p className="card-subtitle">{data.dt}</p>
      </div>
      <div className="card-body">
        <p><strong>Serial No.:</strong> {data.sn}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Location:</strong> {data.Location}</p>
        <p><strong>Nin:</strong> {data.nin}</p>
        <p><strong>PV:</strong> {data.dp_pv}</p>
        <p><strong>PU:</strong> {data.dp_pu}</p>
        <p><strong>AL:</strong> {data.dp_al}</p>
      </div>
    </div>
  );
};

export default DataCard;
