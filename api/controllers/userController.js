const { userService } = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
    const { username, email, password, phone }  = req.body;
    const insertId = await userService.signUp(username, email, password, phone);
    res.status(201).json({ insertId });
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