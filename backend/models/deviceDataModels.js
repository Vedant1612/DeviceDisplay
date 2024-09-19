const db = require('../config/db');

const DataLogger = {
    create: async (data) => {
        const query = `INSERT INTO devicedata.datalogger (dt, sn, nts, nin, snr, dp_sts, dp_dli, dp_dle, dp_mt, dp_pv, dp_pu, dp_al, State, City, Location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            data.dt,
            data.sn,
            data.nts,
            data.nin,
            data.snr,
            data.dp_sts,
            data.dp_dli,
            data.dp_dle,
            data.dp_mt,
            data.dp_pv,
            data.dp_pu,
            data.dp_al,
            data.State,
            data.City,
            data.Location
        ];

        try {
            const [result] = await db.pool.execute(query, values);
            return result; 
        } catch (error) {
            throw error; 
        }
    },
    fetchAll: async () => {
        const query = `SELECT * FROM devicedata.datalogger`;

        try {
            const [rows] = await db.pool.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

const Pressure = {
    create: async (data) => {
        if (!data || !data.data) {
            throw new Error("Invalid data format");
        }

        const query = `INSERT INTO devicedata.Pressure (device_type, device_no, access_token, network_ts, network_info, snr, data_start_timestamps, data_dl_interval, data_dl_entries, pressure_value, alarms, pressure_unit, State, City, Location)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            data.device_type,
            data.device_no,
            data.access_token,
            data.network_ts,
            data.network_info,
            data.snr,
            data.data.start_timestamps,
            data.data.dl_interval,
            data.data.dl_entries,
            data.data.pressure_value,
            data.data.alarms,
            data.data.pressure_unit,
            data.State,
            data.City,
            data.Location,
            
        ];


        if (values.length !== 15) {
            throw new Error(`Expected 14 values, but got ${values.length}`);
        }

        try {
            const [result] = await db.pool.execute(query, values);
            return result; 
        } catch (error) {
            throw error; 
        }

        
    },
    fetchAll: async () => {
        const query = `SELECT * FROM devicedata.Pressure`;

        try {
            const [rows] = await db.pool.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};




module.exports = { DataLogger, Pressure };
