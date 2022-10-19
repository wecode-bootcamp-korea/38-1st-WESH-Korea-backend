const bcrypt = require('bcrypt')

const userDao = require('../models/userDao')

const hashPassword = async (textPassword) => {
	const saltRounds = 10; 
	return await bcrypt.hash(textPassword, saltRounds);
}

const EMAIL_REGEX    = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
const PHONE_REGEX = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/


const signUp = async (name, email, password, phone_number) => {
	
	if ( !name || !email || !password || !phone_number ){
		const error = new Error('KEY_ERROR')
		error.statusCode = 400

		throw error
	}
	
	if (!EMAIL_REGEX.test(email)){
		const error = new Error('INVALID_EMAIL')
		error.statusCode = 400

		throw error
	}

	if (!PASSWORD_REGEX.test(password)){
		const error = new Error('INVALID_PASSWORD')
		error.statusCode = 400

		throw error
	}

	if (!PHONE_REGEX.test(phone_number)){
		const error = new Error('INVALID_PHONE')
		error.statusCode = 400

		throw error
	}

	const hashedPassword = await hashPassword(password)

	return await userDao.createUser(name, email, hashedPassword, phone_number)
}


module.exports = { 
	signUp
}
