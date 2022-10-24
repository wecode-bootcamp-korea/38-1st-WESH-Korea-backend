const mainService = require('../services/mainService');

const mainDetailProducts = async (req, res) => {

    const {limit, offset} = req.query;
    try{
        const result = await mainService.mainDetailProducts(limit, offset);
        res.status(201).json({data: result})
    }
    catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    mainDetailProducts
}