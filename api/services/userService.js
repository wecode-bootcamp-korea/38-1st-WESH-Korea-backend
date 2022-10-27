const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userDao = require('../models/userDao')

const hashPassword = async (textPassword) => {
	const DEFAULT_SALT = 10; 
	return await bcrypt.hash(textPassword, DEFAULT_SALT);
}

const EMAIL_REGEX    = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
const PHONE_REGEX = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/

const getUserById = async (id) => {
	return await userDao.getUserById(id)
}

const signUp = async (name, email, password, phone_number) => {
	
	if ( !name || !email || !password || !phone_number ){
		const error = new Error('KEY_ERROR')
		error.statusCode = 404

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


const signIn = async (email, password) => {
		
	if (!EMAIL_REGEX.test(email)) {
		const error = new Error('INVALID_EMAIL')
		error.statusCode = 401

		throw error
	}

	if (!PASSWORD_REGEX.test(password)) {
		const error = new Error('INVALID_PASSWORD')
		error.statusCode = 401

		throw error
	}

	const user = await userDao.getUserByEmail(email)

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		const error = new Error('WRONG_PASSWORD')
		error.statusCode = 401

		throw error
	}

	const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, 
		{ 
			algorithm: process.env.ALGORITHM
		}
	)

	return accessToken

}

const getUserDetail = async(userId)=>{
	return userDao.getUserDetail(userId);
}

module.exports = { 
	signUp, 
	signIn,
	getUserById,
	getUserDetail
}