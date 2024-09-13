const express = require('express');
const { connectDB } = require('./config/dbConfig');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
app.use(express.json());

// Connect to the SQL Server database
connectDB();

// Use the routes defined in the routes folder
app.use('/api', deviceRoutes);

// Serve the frontend HTML file
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
