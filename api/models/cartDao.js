const { appDataSource } = require("./appDataSource");

const cartList = async ( user_id ) => {
	return await appDataSource.query(`
		SELECT 
			name AS product_name,
			quantity AS product_quantity,
			price AS product_price,
			thumbnail AS product_thumbnail,
      user_id
		FROM carts
    INNER JOIN products
    ON carts.product_id = products.id
		WHERE user_id = ?;`,
    [ user_id ]
	);
}

const cartAdd = async ( user_id, product_id, quantity ) => {
	return await appDataSource.query(`
    INSERT INTO carts
    (
      user_id,
      product_id,
      quantity
    )
    VALUES ( ?, ?, ? );`,
    [ user_id, product_id, quantity ]
	);
}

const cartUpdate = async ( user_id, product_id, quantity ) => {
	await appDataSource.query(`
    UPDATE carts
    SET quantity = ?
    WHERE user_id = ? 
    AND product_id = ?;`,
    [ quantity, user_id, product_id ]
	);
}

const cartDelete = async ( user_id, product_id ) => {
	await appDataSource.query(`
    DELETE
    FROM carts
    WHERE user_id = ?
    AND product_id = ?;`,
    [ user_id, product_id ]
	);
}

const cartListCheck = async ( user_id, product_id ) => {
	return await appDataSource.query(`
		SELECT 
			name,
			quantity,
			price,
			thumbnail,
      user_id
		FROM carts
    INNER JOIN products
    ON carts.product_id = products.id
		WHERE user_id = ?
    AND product_id = ?;`,
    [ user_id, product_id ]
	);
}

module.exports = { 
  cartList,
  cartListCheck,
  cartAdd,
  cartDelete,
  cartUpdate
};