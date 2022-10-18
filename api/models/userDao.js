const appDataSource = require('./moduleDao')

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

  const getUserByEmail = async (email) => {
	const result = await appDataSource.query(`
		SELECT
      id,
			username,
			email,
			password
		FROM users
		WHERE email=?`, [email]
	)
	return result[0]
}

const getUserById = async (id) => {
	const result = await dataSource.query(`
		SELECT 
			id,
			username,
			email,
			password,
		FROM users
		WHERE id=?`, [id]
	)
	return result[0]
}

module.exports = { 
	createUser,
	getUserByEmail,
  getUserById
}