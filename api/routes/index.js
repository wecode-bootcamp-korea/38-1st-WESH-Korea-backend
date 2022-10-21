const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require("./cartRoute");

router.use('/user', userRouter);
router.use("/cart", cartRouter.router);

module.exports = router;