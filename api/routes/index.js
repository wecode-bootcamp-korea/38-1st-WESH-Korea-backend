const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productInfoRouter = require('./productInfoRouter');
const cartRouter = require('./cartRoute');

router.use('/user', userRouter);
router.use('/products_events', productInfoRouter);
router.use('/cart', cartRouter.router);

module.exports = router;