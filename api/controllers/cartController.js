const cartService = require("../services/cartService");

const cartList = async (req, res) => {
  const user_id = req.user.id;
  
  try {
    if ( !user_id ) {
      res.status(400).json({ "message" : "KEY_ERROR" });
    }

    const userCartList = await cartService.cartList( user_id );

    res.status(200).json({ "data" : userCartList });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

const cartAdd = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    if ( !product_id || !quantity ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await cartService.cartAdd( user_id, product_id, quantity );

    res.status(201).json({ "data" : "cartAdd" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

const cartDelete = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user.id;

  try {
    if ( !product_id ) {
      res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await cartService.cartDelete( user_id, product_id );

    res.status(200).json({ "data" : "cartDelete" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

const cartUpdate = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    if ( !product_id || !quantity ) {
      res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await cartService.cartUpdate( user_id, product_id, quantity );

    res.status(200).json({ "data" : "cartUpdate" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { 
  cartList,
  cartAdd,
  cartDelete,
  cartUpdate
};