const {appDataSource} = require('./appDataSource')

const productInfo = async (productId) => {
    
    try{
        const productInfo = await appDataSource.query(
            `SELECT
                p.name AS title,
                p.price,
                p.content AS detail,
                p.thumbnail AS img,
                p.manual,
                p.stock
            FROM products p
            WHERE p.id = ${productId}
            `
        );
        return productInfo;
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 400;
		throw error;
    }
};

module.exports = {
    productInfo
  }