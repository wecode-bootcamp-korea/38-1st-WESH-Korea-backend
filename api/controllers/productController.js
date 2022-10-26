const productService = require('../services/productService');
const { catchAsync } = require("../utils/error");

const getProductList = catchAsync(async (req, res) => {
  const { categoryName } = req.params;
  const { limit, offset, sort } = req.query;

    if ( !categoryName || !limit || !offset ) {
      const err = new Error("UNDEFINED_REQUIRED_INPUT");
      throw err;
    }

    const data = await productService.getProductList(
        categoryName,
        limit,
        offset,
        sort
      )

    return res.status(200).json({ 
        message:"PRODUCTLIST_LOADING_SUCCESS", 
        data:data
    });

});

module.exports = {
    getProductList
}