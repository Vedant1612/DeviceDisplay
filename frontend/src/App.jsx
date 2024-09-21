import axios from 'axios';
import { useState, useEffect } from "react";
import "./App.css";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataCard from '../components/DataCard';
import DataTable from '../components/DataTable';
import AnalyticsSection from '../components/AnalyticsSection';
import { FaDatabase } from 'react-icons/fa';

Chart.register(...registerables);

function App() {
  const [deviceType, setDeviceType] = useState("Choose...");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("cards"); // Add state for view mode

// Function to fetch data from the API with filters
const fetchDataFromAPI = async (deviceType, location, date) => {
  try {
    const params = {
      deviceType,
      location,
      date: date ? date.toLocaleDateString("en-GB") : null, // Format date if available
    };

    let apiUrl = ''; // Dynamically change API URL based on deviceType
    if (deviceType === "DataLogger") {
      apiUrl = 'http://localhost:3000/api/dataLogger';
    } else if (deviceType === "Pressure") {
      apiUrl = 'http://localhost:3000/api/pressure'; // Use the correct URL for Pressure data
    } else if (deviceType === "Chlorin Analyzer") {
      apiUrl = 'http://localhost:3000/api/chlorinAnalyzer'; // If you have a Chlorin Analyzer endpoint
    }

    const response = await axios.get(apiUrl, { params });
    if (response.status === 200) {
      const fetchedData = response.data;
      console.log(fetchedData); // Log the data for debugging
      setData(fetchedData); // Set the data to state
    } else {
      alert('Failed to fetch data from the server');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('An error occurred while fetching data');
  }
};


  // Fetch data on submit
  const fetchData = () => {
    if (deviceType === "Choose..." || location === "" || !date) {
      alert("Please fill all fields");
      return;
    }

    fetchDataFromAPI(deviceType, location, date); // Call the function to fetch data from API

    const newData = {
      type: deviceType,
      location,
      date: date.toLocaleDateString("en-GB"), // Format date
      value: Math.floor(Math.random() * 1000), // Example value
    };

    setData([newData]); // Set new data as array for consistency
    storeDataInLocalStorage(newData);
  };

  // Store data in localStorage
  const storeDataInLocalStorage = (newData) => {
    localStorage.setItem("storedData", JSON.stringify(newData));
  };

  // Reset form and data
  const handleReset = () => {
    setDeviceType("Choose...");
    setLocation("");
    setDate(null); // Reset date
    setData([]);
    localStorage.removeItem("storedData");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("storedData"));
    if (storedData) {
      setData(storedData);

      // Check if the stored date is valid before setting it
      const restoredDate = new Date(storedData.date);
      if (!isNaN(restoredDate.getTime())) {
        setDate(restoredDate);
      } else {
        setDate(null); // If invalid, reset the date
      }
    }
  }, []);


  return (
    <div className="app-container">
      <header className="text-center">
        <h1>Device Data Dashboard</h1>
      </header>

      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="form-control"
            >
              <option value="Choose...">Choose...</option>
              <option value="DataLogger">DataLogger</option>
              <option value="Chlorin Analyzer">Chlorin Analyzer</option>
              <option value="Pressure">Pressure</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="form-control date-picker"
              dateFormat="dd/MM/yyyy" // Format date
              placeholderText="Select a date"
              showYearDropdown
              yearDropdownItemNumber={150} // Show 15 years in dropdown
              scrollableYearDropdown
            />
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={fetchData}>
            Show Data
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset Fields
          </button>
        </div>
      </div>

      {/* toggle button */}
      <div className="view-toggle"> 
        <button className="btn btn-info" onClick={() => setViewMode("cards")}>
          Card View
        </button>
        <button className="btn btn-info" onClick={() => setViewMode("table")}>
          Table View
        </button>
      </div>

      <div className="data-display">
  {viewMode === "cards" ? (
    data.length > 0 ? (
      data.filter(entry => entry.Location === location).length > 0 ? (
        data.map(entry => (
          entry.Location === location && (
            <DataCard key={entry.Id} data={entry} deviceType={deviceType} />
          )
        ))
      ) : (
        <div className="no-data-container">
          <FaDatabase className="no-data-icon" />
          <p className="no-data-message">No data available for the selected location.</p>
        </div>
      )
    ) : (
      <div className="no-data-container">
        <FaDatabase className="no-data-icon" />
        <p className="no-data-message">No data available for the selected filters.</p>
      </div>
    )
  ) : (
    data.length > 0 ? (
      data.filter(entry => entry.Location === location).length > 0 ? (
        <DataTable data={data.filter(entry => entry.Location === location)} location={location} deviceType={deviceType} />
      ) : (
        <div className="no-data-container">
          <FaDatabase className="no-data-icon" />
          <p className="no-data-message">No data available for the selected location.</p>
        </div>
      )
    ) : (
      <div className="no-data-container">
        <FaDatabase className="no-data-icon" />
        <p className="no-data-message">No data available for the selected filters.</p>
      </div>
    )
  )}
</div>


      {/* <ChartSection chartData={chartData} /> */}
      <AnalyticsSection data={data} />
    </div>
  );
}

export default App;
