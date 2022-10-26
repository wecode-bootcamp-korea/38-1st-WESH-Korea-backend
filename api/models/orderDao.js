const { appDataSource } = require("./appDataSource");

const addNewOrder = async ( user_id ) => {
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

const addOrderItem = async ( product_id, product_price, product_quantity, order_id ) => {
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

const getItemByOrder = async ( orderId ) => {
  return await appDataSource.query(`
    SELECT product_id
    FROM order_items
    WHERE order_id = ?;`
    [ orderId ]
  );
}

module.exports = { 
  addNewOrder,
  addOrderItem,
  getItemByOrder
};