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

  await cartDao.cartUpdate( user_id, product_id, quantity );
};

const cartAdd = async ( user_id, product_id, quantity ) => {
  quantity = +quantity;

  if ( isNaN(quantity) ) {
    const err = new Error('CART_QUANTITY_IS_NOT_NUMBER');
    err.statusCode = 400;
    throw err;
  }

  if ( quantity<1 || quantity>20 ) {
    const err = new Error('CART_QUANTITY_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const cartListCheck = await cartDao.cartListCheck( user_id, product_id );

  if ( !cartListCheck || cartListCheck.length === 0 ) {
    await cartDao.cartAdd( user_id, product_id, quantity );
  } else if ( cartListCheck.length > 1 ) {
      const err = new Error('CART_CHECK_LIST_OVERLAP');
      err.statusCode = 500;
      throw err;
  } else {
    const oldQuantity = cartListCheck[0]['quantity'];
    await cartDao.cartUpdate( user_id, product_id, oldQuantity+1 );
  }
};

const cartDelete = async ( user_id, product_id ) => {
  const cartListCheck = await cartDao.cartListCheck( user_id, product_id );
  
  if ( !cartListCheck || cartListCheck.length === 0 ) {
    const err = new Error('CART_PRODUCT_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  await cartDao.cartDelete( user_id, product_id );
};

module.exports = { 
  cartList,
  cartAdd,
  cartUpdate,
  cartDelete
};