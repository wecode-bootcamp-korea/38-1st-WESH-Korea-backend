const productFilterDao = require('../models/productFilterDao');

const priceFilter = async (tag, sort, limit, offset) => {
    const priceProductList = await productFilterDao.priceFilter(tag, sort, limit, offset);
    return priceProductList;
}

module.exports = {
    priceFilter
}