import React from 'react';
import './DataCard.css'; 

const DataCard = ({ data, deviceType }) => {
  // Convert UNIX timestamp to a JavaScript Date object if available
  

  const renderCardHeader = () => {
    switch (deviceType) {
      case 'DataLogger':
        return (
          <div className="card-header">
            <h3>Data Logger</h3>
            <p className="card-subtitle">Logger Information</p>
          </div>
        );
      case 'Pressure':
        return (
          <div className="card-header">
            <h3>Pressure Sensor</h3>
            <p className="card-subtitle">Pressure Data</p>
          </div>
        );
      case 'Chlorin Analyzer':
        return (
          <div className="card-header">
            <h3>Chlorine Analyzer</h3>
            <p className="card-subtitle">Chlorine Levels</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCardBody = () => {
    switch (deviceType) {
      case 'DataLogger':
        const date_D = new Date(data.nts * 1000); // Assuming `nts` is a UNIX timestamp in seconds
        const formattedDate_D = `${date_D.getDate().toString().padStart(2, '0')}/${(date_D.getMonth() + 1).toString().padStart(2, '0')}/${date_D.getFullYear()} ${date_D.getHours().toString().padStart(2, '0')}:${date_D.getMinutes().toString().padStart(2, '0')}:${date_D.getSeconds().toString().padStart(2, '0')}`;
        return (
          <>
            <p className="card-subtitle">{data.dt}</p>
            <p><strong>Serial No.:</strong> {data.sn}</p>
            <p><strong>Date:</strong> {formattedDate_D}</p>
            <p><strong>Nin:</strong> {data.nin}</p>
            <p><strong>PV:</strong> {data.dp_pv}</p>
            <p><strong>PU:</strong> {data.dp_pu}</p>
            <p><strong>AL:</strong> {data.dp_al}</p>
          </>
        );
      case 'Pressure':
        const date_P = new Date(data.network_ts * 1000); // Assuming `nts` is a UNIX timestamp in seconds
        const formattedDate_P = `${date_P.getDate().toString().padStart(2, '0')}/${(date_P.getMonth() + 1).toString().padStart(2, '0')}/${date_P.getFullYear()} ${date_P.getHours().toString().padStart(2, '0')}:${date_P.getMinutes().toString().padStart(2, '0')}:${date_P.getSeconds().toString().padStart(2, '0')}`;
        return (
          <>
            <p className="card-subtitle">{data.device_type}</p>
            <p><strong>Serial No.:</strong> {data.device_no}</p>
            <p><strong>Date:</strong> {formattedDate_P}</p>
            <p><strong>Access Token:</strong> {data.access_token}</p>
            <p><strong>Network_ts:</strong> {data.network_ts}</p>
            <p><strong>Network_info:</strong> {data.network_info}</p>
            <p><strong>snr:</strong> {data.snr}</p>
            <p><strong>Data DL interval:</strong> {data.data_dl_interval}</p>
            <p><strong>Data DL Entries:</strong> {data.data_dl_entries}</p>
            <p><strong>Pressure Value:</strong> {data.pressure_value}</p>
            <p><strong>Alarms:</strong> {data.alarms}</p>
          </>
        );
      case 'Chlorin Analyzer':
        return (
          <>
            <p><strong>Chlorine Level:</strong> {data.chlorine_level}</p>
            <p><strong>Chlorine Unit:</strong> {data.chlorine_unit}</p>
            <p><strong>Date:</strong> {formattedDate}</p>
          </>
        );
      default:
        return <p>No data available for this device type.</p>;
    }
  };

  return (
    <div className="data-card">
      {renderCardHeader()}
      <div className="card-body">
        {renderCardBody()}
      </div>
    </div>
  );
};

export default DataCard;
