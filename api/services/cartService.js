const cartDao = require("../models/cartDao");

const cartList = async ( user_id ) => {
  const cartList = await cartDao.cartList( user_id );

  return cartList;
};

const cartUpdate = async ( user_id, product_id, quantity ) => {
  
  quantity = +quantity;

  if ( isNaN(quantity) ) {
    const err = new Error('CART_QUANTITY_IS_NOT_NUMBER');
    err.statusCode = 400;
    throw err;
  }

  if ( quantity<0 || quantity>20 ) {
    const err = new Error('CART_QUANTITY_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const cartUpdate = await cartDao.cartUpdate( user_id, product_id, quantity );
};

module.exports = { 
  cartList,
  cartUpdate
};