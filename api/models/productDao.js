const {appDataSource} = require('./appDataSource')

const productInfo = async (productId) => {
    
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
};

module.exports = {
    productInfo
  }