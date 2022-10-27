const  productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const productInfo = catchAsync (async (req, res) => {
    
    const productId = +req.params.id;
    const result = await productService.productInfo(productId);
    res.status(201).json({ detailPageData: result });
    
})

module.exports = {
    productInfo
}