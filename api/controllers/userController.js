const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
    try{    
        const { username, email, password, phone }  = req.body;
        console.log(username);

        const insertId = await userService.signUp(username, email, password, phone);
        res.status(201).json({ insertId });
    }
    catch(err){
        console.log(err);
    }
})

module.exports = {
    signUp
}