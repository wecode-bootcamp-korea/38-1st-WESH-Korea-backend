const orderDao = require("../models/orderDao");
const cartDao = require("../models/cartDao");
const userDao = require("../models/userDao");

const addNewOrder = async ( userId, productInfo, totalPrice ) => {
  const QUANTITY_LOWER_LIMIT = 1;
  const QUANTITY_UPPER_LIMIT = 20;

  const orderId = await orderDao.addNewOrder( userId );
  
  if ( Array.isArray(productInfo) ) {
    
    if ( !productInfo.length === 0 ) {
      const err = new Error('ORDER_PRODUCT_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    productInfo.forEach( async (productInfo) => {
      const productId = productInfo.product_id;
      const productQuantity = productInfo.product_quantity;
      
      if ( isNaN(productQuantity) ) {
        const err = new Error('QUANTITY_IS_NOT_NUMBER');
        err.statusCode = 400;
        throw err;
      }

      if ( productQuantity<QUANTITY_LOWER_LIMIT || productQuantity>QUANTITY_UPPER_LIMIT ) {
        const err = new Error('QUANTITY_IS_NOT_VALID');
        err.statusCode = 400;
        throw err;
      }

      await orderDao.addOrderItem( productId, totalPrice, productQuantity, orderId );
      await cartDao.deleteProductInCartList( userId, productId );
    });
  } else {
    const productId = productInfo.product_id;
    const productQuantity = productInfo.product_quantity;

    if ( isNaN(productQuantity) ) {
      const err = new Error('QUANTITY_IS_NOT_NUMBER');
      err.statusCode = 400;
      throw err;
    }

    if ( productQuantity<QUANTITY_LOWER_LIMIT || productQuantity>QUANTITY_UPPER_LIMIT ) {
      const err = new Error('QUANTITY_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    await orderDao.addOrderItem( productId, totalPrice, productQuantity, orderId );
  }

  const userPoint = await userDao.getPointByUserId( userId );
  
  if ( +userPoint.point < +totalPrice ) {
    const err = new Error('POINT_IS_NOT_ENOUGH');
    err.statusCode = 400;
    throw err;
  }

  const changePoint = +userPoint.point - +totalPrice;
  
  await userDao.updatePoint( userId, changePoint );
};

const completeOrderByUser = async ( userId, orderId, totalPrice ) => {
  const CONFIRMATION_ORDER_STATUS_ID = 6;

  const orderCheck = await orderDao.orderCheckByUserId( userId, orderId );
 
  if ( !orderCheck || orderCheck.length === 0 ) {
    const err = new Error('NOT_OWNER_OF_ORDER');
    err.statusCode = 400;
    throw err;
  }

  await orderDao.updateOptionInOrder( userId, orderId, CONFIRMATION_ORDER_STATUS_ID);

  const orderItem = await orderDao.getItemByOrder( orderId );

  if ( !orderItem.length === 0 ) {
    const err = new Error('PRODUCT_IS_EMPTY_IN_ORDER');
    err.statusCode = 400;
    throw err;
  }

  orderItem.forEach( async (orderItem) => {
    const productId = orderItem.product_id;

    await orderDao.addItemInUserProduct( userId, productId );
  });

  const userPoint = await userDao.getPointByUserId( userId ); 
  const changePoint = +userPoint.point + (totalPrice*0.02);
  
  await userDao.updatePoint ( userId, changePoint );
}

module.exports = { 
  addNewOrder,
  completeOrderByUser
};