const orderDao = require("../models/orderDao");
// const cartDao = require("../models/cartDao");
// const userDao = require("../models/userDao");

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

    for(let i=0; i<productInfo.length; i++) {
      const productId = productInfo[i].product_id;
      const productQuantity = productInfo[i].product_quantity;

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
      // await cartDao.cartDelete( userId, productId );
    }
  } else {
    const { productId, totalPrice, productQuantity } = productInfo;
    // const cartCheck = await cartDao.cartListCheck( userId, productId );

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

  // const userPoint = await userDao.getPointByUserId( userId );

  // if ( userPoint < totalPrice ) {
  //   const err = new Error('POINT_IS_NOT_ENOUGH');
  //   err.statusCode = 400;
  //   throw err;
  // }

  // const changePoint = userPoint - totalPrice;

  // await userDao.updatePoint( userId, changePoint );
};

const completeOrderByUser = async ( userId, orderId ) => {
  const orderCheck = await orderCheckByUserId( userId, orderId );

  if ( !orderCheck || !orderCheck.length === 0 ) {
    const err = new Error('NOT_OWNER_OF_ORDER');
    err.statusCode = 400;
    throw err;
  }

  const orderItem = await getItemByOrder( orderId );

  orderItem.forEach( async (orderItem) => {
    const productId = orderItem.product_id;

    await addItemUserProduct( userId, productId );
  });

}

module.exports = { 
  addNewOrder,
  completeOrderByUser
};