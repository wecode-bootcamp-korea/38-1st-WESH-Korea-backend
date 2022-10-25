const productFilterService = require('../services/productFilterService');

const priceFilter = async (req, res) => {
    const {limit, offset} = req.query;
    const {tag, sort} = req.body;
    try{
        const result = await productFilterService.priceFilter(tag, sort, limit, offset);
        res.status(200).json({data: result});
    }
    catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    priceFilter
}