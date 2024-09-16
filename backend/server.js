// backend/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello from the chetan!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
