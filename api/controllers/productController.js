const  productService = require('../services/productService');

const productInfo = async (req, res) => {
    
    const productId = +req.params.id;
    
    try {
        const result = await productService.productInfo(productId);
        res.status(201).json({ detailPageData: result });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};


module.exports = {
    productInfo
}