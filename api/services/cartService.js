const cartDao = require("../models/cartDao");

const getAllCartList = async ( user_id ) => {
  return  await cartDao.getAllCartList( user_id );
};

const updateOptionInCartList = async ( user_id, product_id, quantity ) => {

  if ( quantity<0 || quantity>20 ) {
    const err = new Error('CART_QUANTITY_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  await cartDao.updateOptionInCartList( user_id, product_id, quantity );
};

const addProductInCartList = async ( user_id, product_id, quantity ) => {
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
    await cartDao.addProductInCartList( user_id, product_id, quantity );
  } else if ( cartListCheck.length > 1 ) {
      const err = new Error('CART_CHECK_LIST_OVERLAP');
      err.statusCode = 500;
      throw err;
  } else {
    const oldQuantity = cartListCheck[0]['quantity'];
    if ( oldQuantity+1 > 20 ) {
      const err = new Error('CART_CAN_NOT_MORE_QUANTITY');
      err.statusCode = 400;
      throw err;
    } else {
      await cartDao.updateOptionInCartList( user_id, product_id, oldQuantity+1 );
    }
  }
};

const deleteProductInCartList = async ( user_id, product_info ) => {

  if ( !product_info || !product_info.length === 0 ) {
    const err = new Error('CART_PRODUCT_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  
  if ( Array.isArray(product_info) ) {
    for(let i=0; i<product_info.length; i++) {
      const { product_id } = product_info[i];

      const cartListCheck = await cartDao.cartListCheck( user_id, product_id );
  
      if ( !cartListCheck || cartListCheck.length === 0 ) {
        const err = new Error('CART_PRODUCT_IS_NOT_VALID');
        err.statusCode = 400;
        throw err;
      }

      await cartDao.deleteProductInCartList( user_id, product_id );
    }
  } else {
    const { product_id } = product_info;

    const cartListCheck = await cartDao.cartListCheck( user_id, product_id );
  
    if ( !cartListCheck || cartListCheck.length === 0 ) {
      const err = new Error('CART_PRODUCT_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    await orderDao.orderItemAdd( product_id, product_price, product_quantity, order_id );
  }
};

module.exports = { 
  getAllCartList,
  addProductInCartList,
  updateOptionInCartList,
  deleteProductInCartList
};