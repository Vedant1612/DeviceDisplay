const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./config/db"); 

const dataLoggerRoutes = require('./routes/deviceDataRoutes');
const pressureRoutes = require('./routes/deviceDataRoutes');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Enable JSON request body parsing

// Define routes
// Added leading slash
app.use("/api", dataLoggerRoutes); 

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
