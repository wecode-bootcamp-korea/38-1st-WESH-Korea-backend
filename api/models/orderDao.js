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

const addItemInUserProduct = async ( userId, productId ) => {
	const result = await appDataSource.query(`
    INSERT INTO user_product
    (
      user_id,
      product_id
    )
    VALUES ( ?, ? );`,
    [ userId, productId ]
	);

  return result.insertId;
}

const getItemByOrder = async ( orderId ) => {
  return await appDataSource.query(`
    SELECT product_id
    FROM order_items
    WHERE order_id = ?;`,
    [ orderId ]
  );
}

const orderCheckByUserId = async ( userId, orderId ) => {
  const orderStatusId = await appDataSource.query(`
    SELECT order_status_id
    FROM orders
    WHERE id = ?
    AND user_id = ?;`,
    [ orderId, userId ]
  );

  return orderStatusId;
}

const userProductCheckByUserId = async ( userId, productId ) => {
  return await appDataSource.query(`
    SELECT 
      user_id,
      product_id
    FROM user_product
    WHERE product_id = ?
    AND user_id = ?;`,
    [ productId, userId ]
  );
}

const updateOptionInOrder = async ( userId, orderId, orderStatusId ) => {
  await appDataSource.query(`
  UPDATE orders
  SET order_status_id = ?
  WHERE user_id = ?
  AND id = ?`,
    [ orderStatusId, userId, orderId ]
	);
}




module.exports = { 
  addNewOrder,
  addOrderItem,
  getItemByOrder,
  orderCheckByUserId,
  updateOptionInOrder,
  addItemInUserProduct,
  userProductCheckByUserId
};