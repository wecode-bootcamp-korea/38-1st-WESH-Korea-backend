const cartDao = require("../models/cartDao");

const cartList = async ( user_id ) => {
  const cartList = await cartDao.cartList( user_id );

  return cartList;
};

module.exports = { 
  cartList
};