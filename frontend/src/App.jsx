import { useState, useEffect } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Chart.register(...registerables);

function App() {
  const [deviceType, setDeviceType] = useState("Choose...");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null); // Changed to null for DatePicker
  const [data, setData] = useState(null);

  // Fetch data on submit
  const fetchData = () => {
    if (deviceType === "Choose..." || location === "" || !date) {
      alert("Please fill all fields");
      return;
    }

    const newData = {
      type: deviceType,
      location,
      date: date.toLocaleDateString("en-GB"), // Format date
      value: Math.floor(Math.random() * 1000), // Example value
    };

    setData(newData);
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
    setData(null);
    localStorage.removeItem("storedData");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("storedData"));
    if (storedData) {
      setData(storedData);
      setDate(new Date(storedData.date)); // Restore date from storage
    }
  }, []);

  // Sample data for the chart
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Device Data",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#ff79c6",
        tension: 0.1,
      },
    ],
  };

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

      <div className="data-display">
        {data ? (
          <>
            <div className="card">
              <h3>{data.type}</h3>
              <p>Location: {data.location}</p>
              <p>Date: {data.date}</p>
              <div className="card-extended">
                <p>Value: {data.value}</p>
                <p>Status: {data.value > 500 ? "High" : "Normal"}</p>
              </div>
            </div>

            <div className="chart-container">
              <Line data={chartData} />
            </div>

            <div className="analytics-section">
        {data && (
          <>
            <div className="analytics-card">
              <h4>Average Value</h4>
              <p className="analytics-value">320</p>
            </div>
            <div className="analytics-card">
              <h4>Maximum Value</h4>
              <p className="analytics-value">{data.value}</p>
            </div>
          </>
        )}
      </div>
          </>
        ) : (
          <>
          <p>No data to display</p>
          </>
        )}
      </div>

      
    </div>
  );
}

export default App;
