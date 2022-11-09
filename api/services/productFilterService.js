const productFilterDao = require('../models/productFilterDao');

const getProductsByFiltererCondition = async (tag, sort, limit, offset) => {
    const priceProductList = await productFilterDao.getProductsByFiltererCondition(tag, sort, limit, offset);
    return priceProductList;
}

module.exports = {
    getProductsByFiltererCondition
}