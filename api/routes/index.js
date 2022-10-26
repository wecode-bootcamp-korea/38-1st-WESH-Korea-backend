const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productInfoRouter = require('./productInfoRouter');
const cartRouter = require('./cartRoute');
const productRouter = require('./productRouter');

router.use('/user', userRouter);
router.use('/cart', cartgitRouter.router);
router.use('/product', productRouter);
router.use('/products-events', productInfoRouter);
router.use('/cart', cartRouter.router);


module.exports = router;