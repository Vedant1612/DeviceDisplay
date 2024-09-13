const sql = require('mssql');

// Configure the SQL Server connection details
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'localhost', // Replace with your SQL Server address
    database: 'your_database', // Replace with your database name
    options: {
        encrypt: true,   // Use encryption for Azure SQL, set to false for local
        enableArithAbort: true
    }
};

// Connect to SQL Server
const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (err) {
        console.log("Database connection failed", err);
    }
};

module.exports = { connectDB, sql };
