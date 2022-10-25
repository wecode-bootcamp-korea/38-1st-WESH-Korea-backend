const cartDao = require("../models/cartDao");

const QUANTITY_LOWER_LIMIT = 1;
const QUANTITY_UPPER_LIMIT = 20;

const getAllCartList = async ( userId ) => {
  return  await cartDao.getAllCartList( userId );
};

const updateOptionInCartList = async ( userId, productId, quantity ) => {

  if ( quantity<QUANTITY_LOWER_LIMIT || quantity>QUANTITY_UPPER_LIMIT ) {
    const err = new Error('CART_QUANTITY_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  await cartDao.updateOptionInCartList( userId, productId, quantity );
};

const addProductInCartList = async ( userId, productId, quantity ) => {
  quantity = +quantity;

  if ( isNaN(quantity) ) {
    const err = new Error('CART_QUANTITY_IS_NOT_NUMBER');
    err.statusCode = 400;
    throw err;
  }

  if ( quantity<QUANTITY_LOWER_LIMIT || quantity>QUANTITY_UPPER_LIMIT ) {
    const err = new Error('CART_QUANTITY_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const cartListCheck = await cartDao.cartListCheck( userId, productId );

  if ( !cartListCheck || cartListCheck.length === 0 ) {
    await cartDao.addProductInCartList( userId, productId, quantity );
  } 
  
  if ( cartListCheck.length > 1 ) {
      const err = new Error('CART_CHECK_LIST_OVERLAP');
      err.statusCode = 500;
      throw err;
  }
  
  if ( cartListCheck.length === 1 ) {
    const oldQuantity = cartListCheck[0]['quantity'];

    if ( oldQuantity+1 > QUANTITY_UPPER_LIMIT ) {
      const err = new Error('CART_CAN_NOT_ADD_MORE_QUANTITY');
      err.statusCode = 400;
      throw err;
    }

    await cartDao.updateOptionInCartList( userId, productId, oldQuantity+1 );

  }
};

const deleteProductInCartList = async ( userId, productInfo ) => {

  if ( !productInfo || !productInfo.length === 0 ) {
    const err = new Error('CART_PRODUCT_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  
  if ( Array.isArray(productInfo) ) {
    productInfo.forEach( async (productInfo) => {
      const productId = productInfo.product_id;

      const cartListCheck = await cartDao.cartListCheck( userId, productId );
  
      if ( !cartListCheck || cartListCheck.length === 0 ) {
        const err = new Error('CART_PRODUCT_IS_NOT_VALID');
        err.statusCode = 400;
        throw err;
      }

      await cartDao.deleteProductInCartList( userId, productId );
    });
  } 
  
  if ( !Array.isArray(productInfo) ) {
    const productId = productInfo.product_id;

    const cartListCheck = await cartDao.cartListCheck( userId, productId );
  
    if ( !cartListCheck || cartListCheck.length === 0 ) {
      const err = new Error('CART_PRODUCT_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    await cartDao.deleteProductInCartList( userId, productId );
  }
};

module.exports = { 
  getAllCartList,
  addProductInCartList,
  updateOptionInCartList,
  deleteProductInCartList
};