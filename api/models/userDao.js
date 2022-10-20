const {appDataSource} = require('./appDataSource')

const createUser = async (name, email, password, phone_number) => {
    const point = 500000;
    const result = await appDataSource.query(
      `INSERT INTO users (
                name, 
                email,
                password,
                phone_number,
                point
        ) VALUES (?, ?, ?, ?, ${point})
        `, [name, email, password, phone_number]
    )
      return result.insertId
  }
 
const getUserByEmail = async (email) => {
  const result = await appDataSource.query(
    `SELECT
      id,
      name,
      email,
      password
    FROM users
    WHERE email=?
    `, [email]
  )
  return result[0]
}
  
const getUserById = async (id) => {
  const result = await dataSource.query(
    `SELECT 
      id,
      name,
      email,
      password,
    FROM users
    WHERE id=?
    `, [id]
  )
  return result[0]
}
  
module.exports = { 
  createUser,
  getUserByEmail,
  getUserById
}