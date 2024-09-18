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

module.exports = {
    createDataLogger,
    createPressure,
  };