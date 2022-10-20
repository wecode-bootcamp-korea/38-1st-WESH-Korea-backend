const mysqlDataSource = require("./appDataSource");

const cartList = async (user_id) => {
	return await mysqlDataSource.query(`
		SELECT 
			name,
			quantity,
			price,
			thumbnail,
      user_id
		FROM carts
    INNER JOIN products
    ON carts.product_id = products.id
		WHERE user.id = ?`, [user_id]
	);
}

module.exports = { 
  cartList
};