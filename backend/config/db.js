// src/config/db.js
const mysql = require("mysql2/promise"); // Use the promise-based version

const pool = mysql.createPool({
  host: "localhost",
  database: "devicedata",
  user: "root",
  password: "vedant",
});

// Check connection (optional, you can also remove this if not needed)
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`Connected to the database successfully.`);
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error(`Error connecting to the MySQL database: ${err.stack}`);
  }
};

module.exports = {
  pool,
  checkConnection,
};
