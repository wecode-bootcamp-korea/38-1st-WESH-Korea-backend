const mainDao = require('../models/mainDao');

const mainPage = async () => {
    const result = await mainDao.mainPage();
    return result;
}

module.exports = {
    mainPage
}