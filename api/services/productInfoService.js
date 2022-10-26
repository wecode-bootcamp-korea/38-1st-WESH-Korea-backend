const productInfoDao = require('../models/productInfoDao');

const getDetailProducts = async (limit, offset) => {
    const result = await productInfoDao.getDetailProducts(limit, offset);
    return result;
}

module.exports = {
    getDetailProducts
}