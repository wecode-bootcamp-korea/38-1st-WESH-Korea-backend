const productDao = require('../models/productDao');
const reivewDao = require('../models/reviewDao');

const productInfo = async (productId) => {
    
    const product = await productDao.productInfo(productId);
    const reviews = await reivewDao.getReviews(productId);

    if(!product.length){
        const error =  new Error("PRODUCT_DOES_NOT_EXIST");
        error.statusCode = 400;
        throw error;
    }

    return [...product, ...reviews];
}


module.exports = {
    productInfo
}