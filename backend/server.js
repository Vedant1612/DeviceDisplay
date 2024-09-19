const express = require("express");
const cors = require("cors"); // Import cors
const bodyParser = require("body-parser");
const db = require("./config/db");

const dataLoggerRoutes = require('./routes/deviceDataRoutes');
const pressureRoutes = require('./routes/deviceDataRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Enable JSON request body parsing

// Define routes
app.use("/api", dataLoggerRoutes);
// If you have another route for pressure, you might want to use it, e.g.,
// app.use("/api/pressure", pressureRoutes);

// Check database connection
db.checkConnection();

// Start server
app.listen(port, (err) => {
  if (err) {
    console.log(`Server error on port ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
