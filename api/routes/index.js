const router = require("express").Router();

// const userRouter = require("./userRoute");
// const postRouter = require("./postRoute");
const cartRouter = require("./cartRoute");

router.use("/cart", userRouter.router);
// router.use("/users", userRouter.router);
// router.use("/products", postRouter.router);
// router.use("/review", postRouter.router);
// router.use("/cart", postRouter.router);
// router.use("/sell", postRouter.router);

module.exports = router;