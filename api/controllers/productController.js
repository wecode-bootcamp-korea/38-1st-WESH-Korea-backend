const productService = require('../services/productService');

const getProductList = async (req, res) => {
  const { categoryName } = req.params;
  const { limit, offset, sort } = req.query;

  try {
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
  } catch (err) {
    res.status( err.statusCode || 500 ).json({ message: err.message });
  }
};

module.exports = {
    getProductList
}