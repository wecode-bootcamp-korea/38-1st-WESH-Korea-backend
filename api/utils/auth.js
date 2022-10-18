const jwt = require('jsonwebtoken')
const { userService } = require('../services')

const loginRequired = async (req, res, next) => {

  const accessToken = req.headers.authorization
// 1) Getting token and check of it's there
	if (!accessToken) {
		const error = new Error('NEED_ACCESS_TOKEN')
		return res.status(401).json({message: error.message})
	}

// 2) Verification token
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

// 3) Check if user still exists
	const user = await userService.getUserByEmail(decoded.id)

	if (!user) {
		const error = new Error('USER_DOES_NOT_EXIST')		
		return res.status(404).json({message: error.message})
	}
// 4) GRANT ACCESS
  req.user = user;
  next();
}

module.exports = { loginRequired }
