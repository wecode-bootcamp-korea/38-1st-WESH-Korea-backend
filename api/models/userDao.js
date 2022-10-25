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

const getPointByUserId = async (id) => {
  const result = await appDataSource.query(
    `SELECT 
      id,
      point
    FROM users
    WHERE id=?
    `, [id]
  )
  return result[0]
}

const updatePoint = async (id, point) => {
  await appDataSource.query(
    `UPDATE users
    SET point=?
    WHERE id=?
    `, [point, id]
  )
}
  
const getUserDetail = async (userId) => {
  const result = await appDataSource.query(
    `
    SELECT 
      u.id, 
      name AS username, 
      email AS username, 
      phone_number AS userphone, 
      point,
      os.id AS orderStatusId,
      os.status_description AS orderStatus,
      COUNT(order_status_id) AS countByOrder 
    FROM users u 
    LEFT JOIN orders o ON u.id = o.user_id 
    JOIN order_statuses os ON o.order_status_id=os.id 
    WHERE u.id = ?
    GROUP BY order_status_id;
  `,
    [userId]
  );
  return result;
};

module.exports = { 
  createUser,
  getUserByEmail,
  getUserById,
  getUserDetail,
  getPointByUserId,
  updatePoint
}