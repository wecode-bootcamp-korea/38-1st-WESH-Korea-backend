const jwt = require('jsonwebtoken')
const { userService } = require('../services')

const loginRequired = async (req, res, next) => {

  const accessToken = req.headers.authorization
	if (!accessToken) {
		const error = new Error('NEED_ACCESS_TOKEN')
		return res.status(401).json({message: error.message})
	}

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

  req.user = user;
  next();
}

module.exports = { loginRequired }
