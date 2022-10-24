const router = require("express").Router();
const { loginRequired } = require("../utils/auth");

const userController = require("../controllers/cartController");

router.get("/", loginRequired, userController.getAllCartList);
router.post("/", loginRequired, userController.addProductInCartList);
router.delete("/", loginRequired, userController.deleteProductInCartList);
router.patch("/", loginRequired, userController.updateOptionInCartList);

module.exports = { router };