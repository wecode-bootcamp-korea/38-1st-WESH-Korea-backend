const { appDataSource } = require("./appDataSource");

const orderAdd = async ( user_id ) => {
	const result = await appDataSource.query(`
    INSERT INTO orders
    (
      user_id,
      order_status_id
    )
    VALUES ( ?, ? );`,
    [ user_id, 1 ]
	);

  return result.insertId;
}

const orderItemAdd = async ( product_id, product_price, product_quantity, order_id ) => {
	const result = await appDataSource.query(`
    INSERT INTO order_items
    (
      product_id,
      order_item_price,
      order_item_quantity,
      order_id,
      order_item_status_id
    )
    VALUES ( ?, ?, ?, ?, ? );`,
    [ product_id, product_price, product_quantity, order_id, 1 ]
	);

  return result.insertId;
}

module.exports = { 
  orderAdd,
  orderItemAdd
};