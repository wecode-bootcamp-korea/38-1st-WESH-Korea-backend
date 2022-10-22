const {appDataSource} = require('./appDataSource')

const createUser = async (name, email, password, phone_number) => {
    const DEFAULT_POINT = 500000;
    const user = await appDataSource.query(
      `INSERT INTO users (
                name, 
                email,
                password,
                phone_number,
                point
        ) VALUES (?, ?, ?, ?, ?)
        `, [name, email, password, phone_number, DEFAULT_POINT]
    )
      return user.insertId
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
  const result = await appDataSource.query(
    `SELECT 
    id,
    name,
    email,
    password
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