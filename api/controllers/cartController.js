const cartService = require("../services/cartService");

const cartList = async (req, res) => {
  const { user_id } = req.body;

  try {
    if ( !user_id ) {
      res.status(400).json({ "message" : "KEY_ERROR" });
    }

    const userCartList = await cartService.cartList( user_id );

    res.status(200).json({ "data" : userCartList });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

// const cartAdd = async (req, res) => {
//   try {
//     const { user_id, product_id } = req.body;
    
//     if ( !user_id || !product_id ) {
//       return res.status(400).json({ "message" : "KEY_ERROR" });
//     }

//     await cartService.cartAdd( user_id, product_id );

//     res.status(201).json({ "data" : "cartAdd" });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ "message" : err.message });
//   }
// };

// const cartDelete = async (req, res) => {
//   try {
//     const { user_id, product_id } = req.body;
    
//     if ( !user_id || !product_id ) {
//       return res.status(400).json({ "message" : "KEY_ERROR" });
//     }

//     await cartService.cartAdd( user_id, product_id );

//     res.status(201).json({ "data" : "cartAdd" });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ "message" : err.message });
//   }
// };

const cartUpdate = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    if ( !user_id || !product_id || !quantity ) {
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
  // cartAdd,
  // cartDelete,
  cartUpdate
};