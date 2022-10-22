const router = require("express").Router();
const { loginRequired } = require("../utils/auth");

const userController = require("../controllers/cartController");

router.get("/", loginRequired, userController.cartList);
router.post("/", loginRequired, userController.cartAdd);
router.delete("/", loginRequired, userController.cartDelete);
router.put("/", loginRequired, userController.cartUpdate);

module.exports = { router };