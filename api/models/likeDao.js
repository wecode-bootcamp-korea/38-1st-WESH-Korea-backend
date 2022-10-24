const { appDataSource } = require("./appDataSource");

const checkLike = async(userId, productId) => {
   const duplication = await appDataSource.query(`
    SELECT
        id
    FROM likes
    WHERE user_id = ? and product_id = ?
   `, [userId, productId])
    console.log(duplication[0].id)
   return duplication[0].id;
}

const makeLike = async(userId, productId) => {
    const result = await appDataSource.query(`
    INSERT into likes (
        product_id, 
        user_id
        ) VALUES (?, ?)
    `, [productId, userId]);
    
    console.log("made : "+ result.insertId)
    return result.insertId;
}

// const deleteLike = async(userId, productId) => {
//     await appDataSource.query(`
//         DELETE FROM likes
//         WHERE user_id = ? and product_id = ?
//     `, [userId, productId]);
// }

module.exports = {
    checkLike,
    makeLike,
    // deleteLike
}