const {appDataSource} = require('./appDataSource')

const mainPage = async () => {
    try{
        const eventImgs = await appDataSource.query(
            `SELECT
                events.image_url AS img
            FROM events
            `
        );
        const bestProducts = await appDataSource.query(
            `SELECT
                products.id,
                products.name AS title,
                products.price,
                products.thumbnail AS img
            FROM user_product 
            INNER JOIN products
            ON products.id = user_product.product_id
            GROUP BY product_id 
            ORDER BY count(*) DESC
            LIMIT 5 OFFSET 0
            `
        )
        return {
            eventImgs: eventImgs,
            bestProducts: bestProducts
        }
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 400;
		throw error;
    }
}

module.exports = {
    mainPage
}