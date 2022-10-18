const {appDataSource} = require('../utils/appDataSource')

const createUser = async (name, email, password, phone_number) => {
    const point = 500000;
    const result = await appDataSource.query(`
        INSERT INTO users (
                name, 
                email,
                password,
                phone_number,
                point
        ) VALUES (
                  ?,
                  ?, 
                  ?, 
                  ?,
                  ${point}
        )`, [name, email, password, phone_number]
    )
      return result.insertId
  }
 
module.exports = { 
	createUser
}