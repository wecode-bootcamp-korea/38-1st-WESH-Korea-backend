const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRoute');
const productRouter = require('./productRouter');

router.use('/user', userRouter);
router.use('/cart', cartRouter.router);
router.use("/productlist", productRouter.router);

module.exports = router;