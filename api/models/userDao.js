const {appDataSource} = require('../utils/appDataSource')

const createUser = async (username, email, password, phone) => {
    const result = await appDataSource.query(`
        INSERT INTO users (
                username, 
                email,
                password,
                phone
        ) VALUES (
                  ?,
                  ?, 
                  ?, 
                  ?
        )`, [username, email, password, phone]
    )
      return result.insertId
  }
 
module.exports = { 
	createUser
}