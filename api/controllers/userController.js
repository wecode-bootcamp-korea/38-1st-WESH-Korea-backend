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

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try{
        const accessToken = await userService.signIn(email, password)
		res.status(200).json({ accessToken })
    }
    catch(error){
        res.status(error.statusCode).json({ message: error.message });
    }
}

module.exports = {
    signUp,
    signIn
}