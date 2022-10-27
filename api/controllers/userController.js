const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {

        const { name, email, password, phone_number }  = req.body;

        const insertId = await userService.signUp(name, email, password, phone_number);
        res.status(201).json({ insertId });

})

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try{
        const accessToken = await userService.signIn(email, password)
		res.status(200).json({ "data" : accessToken })
    }
    catch(error){
        res.status(error.statusCode).json({ message: error.message });
    }
}

const getUserDetail = catchAsync(async (req, res) =>{
    const { user } = req.user;

    const data = await userService.getUserDetail(user);
    res.status(201).json({data : data});
    
})

module.exports = {
    signUp,
    signIn,
    getUserDetail
}