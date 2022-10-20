const router = require("express").Router();

const userController = require("../controllers/cartController");

router.get("/", userController.cartList);
// router.post("/", userController.cartAdd);
// router.delete("/", userController.cartDelete);
router.put("/", userController.cartUpdate);

module.exports = { router };