const orderDao = require("../models/orderDao");
// const cartDao = require("../models/cartDao");
// const userDao = require("../models/userDao");

const orderAdd = async ( user_id, product_info, total_price ) => {

  if ( !product_info || !product_info.length === 0 ) {
    const err = new Error('ORDER_PRODUCT_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const order_id = await orderDao.orderAdd( user_id );
  
  if ( Array.isArray(product_info) ) {
    for(let i=0; i<product_info.length; i++) {
      const { product_id, product_price, product_quantity } = product_info[i];

      if ( isNaN(product_quantity) ) {
        const err = new Error('QUANTITY_IS_NOT_NUMBER');
        err.statusCode = 400;
        throw err;
      }

      if ( product_quantity<0 || product_quantity>20 ) {
        const err = new Error('QUANTITY_IS_NOT_VALID');
        err.statusCode = 400;
        throw err;
      }

      await orderDao.orderItemAdd( product_id, product_price, product_quantity, order_id );
      // await cartDao.cartDelete( user_id, product_id );
    }
  } else {
    const { product_id, product_price, product_quantity } = product_info;
    // const cartCheck = await cartDao.cartListCheck( user_id, product_id );

    if ( isNaN(product_quantity) ) {
      const err = new Error('QUANTITY_IS_NOT_NUMBER');
      err.statusCode = 400;
      throw err;
    }

    if ( product_quantity<0 || product_quantity>20 ) {
      const err = new Error('QUANTITY_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    await orderDao.orderItemAdd( product_id, product_price, product_quantity, order_id );
    
    // if ( cartCheck && cartCheck.length !== 0 ) {
    //   await cartDao.cartDelete( user_id, product_id );
    // }
  }

  // const user_point = await userDao.getPointById( user_id );

  // if ( user_point < total_price ) {
  //   const err = new Error('POINT_IS_NOT_ENOUGH');
  //   err.statusCode = 400;
  //   throw err;
  // }

  // const update_point = user_point - total_price;

  // await userDao.updatePoint( user_id, update_point );
};

module.exports = { 
  orderAdd
};