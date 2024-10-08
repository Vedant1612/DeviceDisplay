const  {DataLogger,Pressure} = require('../models/deviceDataModels');


const createDataLogger = async (req,res)=>{
    try {
        const result = await DataLogger.create(req.body);
        res.status(201).json({ message: 'DataLogger created successfully', result });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createPressure = async (req,res)=>{
    try {
        const result = await Pressure.create(req.body);
        res.status(201).json({ message: 'Pressure created successfully', result });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const fetchAllPressure = async (req, res) => {
    try {
        const results = await Pressure.fetchAll();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const fetchAllDataLogger = async (req, res) => {
    try {
        const results = await DataLogger.fetchAll();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createDataLogger,
    createPressure,
    fetchAllPressure,
    fetchAllDataLogger
  };