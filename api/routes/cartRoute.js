const router = require("express").Router();

const userController = require("../controllers/cartController");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/:id/posts", userController.posts);
router.get("/:id/info", userController.userInfo);

module.exports = { router };