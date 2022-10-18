const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
    try{    
        const { name, email, password, phone_number }  = req.body;

        const insertId = await userService.signUp(name, email, password, phone_number);
        res.status(201).json({ insertId });
    }
    catch(err){
        console.log(err);
    }
})

module.exports = {
    signUp
}