const {appDataSource} = require('./appDataSource')

const getProductsByFiltererCondition = async (tag, sort, limit, offset) => {
    const highPrice = await appDataSource.query(
        `SELECT
            p.id, 
            p.name as title,
            p.price,
            p.thumbnail as img,
            t.name as tag
        FROM products p
        INNER JOIN product_tag pt
        ON p.id = pt.product_id
        INNER JOIN tags t
        ON pt.tag_id = t.id
        WHERE t.name=?
        ORDER BY price 
        LIMIT ? OFFSET ?
        `, [tag, +limit, +offset]
    )
    return highPrice;
    
}

module.exports = {
    getProductsByFiltererCondition
}