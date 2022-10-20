const mysqlDataSource = require("./appDataSource");

const cartList = async ( user_id ) => {
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
		WHERE user.id = ?;`,
    [ user_id ]
	);
}

const cartUpdate = async ( user_id, product_id, quantity ) => {
	await mysqlDataSource.query(`
    UPDATE carts
    SET quantity = ?
    WHERE user_id = ? 
    AND product_id = ?;`,
    [ quantity, user_id, product_id ]
	);
}

module.exports = { 
  cartList,
  cartUpdate
};