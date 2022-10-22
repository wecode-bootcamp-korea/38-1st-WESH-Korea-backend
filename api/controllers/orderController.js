const orderService = require("../services/orderService");

const orderAdd = async (req, res) => {
  const user_id = req.user.id;
  const { product_info } = req.body;

  try {
    if ( !product_info ) {
      res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await orderService.orderAdd( user_id, product_info );

    res.status(200).json({ "data" : "orderComplete" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { 
  orderAdd
};