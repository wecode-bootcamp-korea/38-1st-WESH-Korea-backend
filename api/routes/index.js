const router = require("express").Router();

const cartRouter = require("./cartRoute");

router.use("/cart", cartRouter.router);

module.exports = router;