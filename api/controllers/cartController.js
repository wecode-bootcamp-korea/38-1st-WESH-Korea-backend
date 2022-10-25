const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const getAllCartList = catchAsync(async (req, res) => {
  const userId = req.user.id;

  if ( !userId ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const userCartList = await cartService.getAllCartList( userId );

  res.status(200).json({ "data" : userCartList });
});

const addProductInCartList = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.body.product_id;
  const userId = req.user.id;

  if ( !productId || !quantity ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await cartService.addProductInCartList( userId, productId, quantity );

  res.status(201).json({ "data" : "addProductInCartList" });
});

const deleteProductInCartList = catchAsync(async (req, res) => {
  const productInfo = req.body.product_info;
  const userId = req.user.id;

  if ( !productInfo || productInfo.length === 0 ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await cartService.deleteProductInCartList( userId, productInfo );

  res.status(200).json({ "data" : "deleteProductInCartList" });
});

const updateOptionInCartList = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.body.product_id;
  const userId = req.user.id;
  
  if ( !productId || !quantity ) {
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

  await cartService.updateOptionInCartList( userId, productId, NumberQuantity );

  res.status(200).json({ "data" : "updateOptionInCartList" });
});

module.exports = { 
  getAllCartList,
  addProductInCartList,
  deleteProductInCartList,
  updateOptionInCartList
};