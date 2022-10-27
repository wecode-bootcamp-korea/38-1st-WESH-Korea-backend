const productFilterService = require('../services/productFilterService');
const { catchAsync } = require('../utils/error');

const priceFilter = catchAsync (async (req, res) => {
    const {limit, offset} = req.query;
    const {tag, sort} = req.body;
  
    const result = await productFilterService.priceFilter(tag, sort, limit, offset);
    res.status(200).json({data: result});
   
})

module.exports = {
    priceFilter
}