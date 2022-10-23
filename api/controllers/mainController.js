const mainService = require('../services/mainService');

const mainPage = async (req, res) => {
    try{
        const result = await mainService.mainPage();
        res.status(201).json({data: result})
    }
    catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
    mainPage
}