const mainDao = require('../models/mainDao');

const mainDetailProducts = async (limit, offset) => {
    const result = await mainDao.mainDetailProducts(limit, offset);
    return result;
}

module.exports = {
    mainDetailProducts
}