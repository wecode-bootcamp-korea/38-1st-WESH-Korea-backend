const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const getAllCartList = catchAsync(async (req, res) => {
  const user_id = req.user.id;

  if ( !user_id ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const userCartList = await cartService.getAllCartList( user_id );

  res.status(200).json({ "data" : userCartList });
});

const addProductInCartList = catchAsync(async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  if ( !product_id || !quantity ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await cartService.addProductInCartList( user_id, product_id, quantity );

  res.status(201).json({ "data" : "addProductInCartList" });
});

const deleteProductInCartList = catchAsync(async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user.id;

  if ( !product_id ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await cartService.deleteProductInCartList( user_id, product_id );

  res.status(200).json({ "data" : "deleteProductInCartList" });
});

const updateOptionInCartList = catchAsync(async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;
  
  if ( !product_id || !quantity ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
    
  if ( isNaN(quantity) ) {
    const err = new Error("CART_QUANTITY_IS_NOT_NUMBER");
    err.statusCode = 400;
    throw err;
  }
  
  const NumberQuantity = +quantity;

  await cartService.updateOptionInCartList( user_id, product_id, NumberQuantity );

  res.status(200).json({ "data" : "updateOptionInCartList" });
});

module.exports = { 
  getAllCartList,
  addProductInCartList,
  deleteProductInCartList,
  updateOptionInCartList
};