const { sql } = require('../config/dbConfig');

// Function to fetch data based on device type and date
const getData = async (req, res) => {
    const { deviceType, date } = req.query;

    let query;
    if (deviceType === 'DataLogger') {
        query = `SELECT * FROM DataLogger WHERE dt = '${deviceType}' AND nts >= '${date}'`;
    } else if (deviceType === 'Pressure') {
        query = `SELECT * FROM Pressure WHERE device_type = '${deviceType}' AND network_ts >= '${date}'`;
    } else {
        return res.status(400).send('Invalid device type');
    }

    try {
        const result = await sql.query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { getData };
