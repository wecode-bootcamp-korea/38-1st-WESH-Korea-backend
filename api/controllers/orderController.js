const orderService = require("../services/orderService");
const { catchAsync } = require("../utils/error");

const addNewOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productInfo = req.body.product_info;
  const totalPrice = req.body.total_price;

  if ( !productInfo || !totalPrice ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await orderService.addNewOrder( userId, productInfo, totalPrice );

  res.status(200).json({ "data" : "orderComplete" });
});

const completeOrderByUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const orderId = req.body.order_id;
  const totalPrice = req.body.total_price;

  if ( !orderId || !totalPrice ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await orderService.completeOrderByUser( userId, orderId, totalPrice );

  res.status(200).json({ "data" : "completeOrderByUser" })
});

const cancelOrderByUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const orderId = req.body.order_id;
  const totalPrice = req.body.total_price;

  if ( !orderId || !totalPrice ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await orderService.cancelOrderByUser( userId, orderId, totalPrice );

  res.status(200).json({ "data" : "cancelOrderByUser" })
});

module.exports = { 
  addNewOrder,
  completeOrderByUser,
  cancelOrderByUser
};