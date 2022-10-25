const {appDataSource} = require('./appDataSource')

const getReviews = async (productId) => {
    const reviews = await appDataSource.query(
        `SELECT 
            r.score,
            r.content,
            r.created_at,
            p.thumbnail AS img
        FROM reviews r
        INNER JOIN products p
        ON r.product_id = p.id
        WHERE r.product_id = ${productId}
        `
    );
    return reviews;
}

const createReview = async (userId, productId, content, score) => {
    return await appDataSource.query(
        `INSERT INTO reviews(
            user_id,
            product_id,
            content,
            score
        ) VALUES (?, ?, ?, ?)
        `, [userId, productId, content, score]
    );
}

const checkUserProduct = async (userId, productId) => {
    const checkProduct = await appDataSource.query(
        `SELECT
            user_id,
            product_id
        FROM user_product
        WHERE user_id=? AND product_id=?
        `, [userId, productId]
    )
    return checkProduct;
} 

const checkUserReview = async (userId, productId) => {
    const checkReview = await appDataSource.query(
        `SELECT
            user_id,
            product_id
        FROM reviews
        WHERE user_id=? AND product_id=?
        `, [userId, productId]
    )
    return checkReview;
}

const modifyReview = async (userId, productId, content, score) => {
    return await appDataSource.query(
        `UPDATE reviews
        SET content=?,
        score=?
        WHERE user_id=? AND product_id=?
        `, [content, score, userId, productId]
    )
}

const deleteReview = async (userId, productId) => {
    await appDataSource.query(
        `DELETE FROM reviews
        WHERE user_id=? AND product_id=?
        `, [userId, productId]
    )
}


module.exports = {
    getReviews,
    createReview,
    checkUserProduct,
    checkUserReview,
    modifyReview,
    deleteReview
}
