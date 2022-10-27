const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');
const productInfoRouter = require('./productInfoRouter');
const cartRouter = require('./cartRoute');
const orderRouter = require('./orderRouter');
const eventCommentRouter = require('./eventCommentRouter');
const reviewRouter = require('./reviewRouter');
const productRouter = require('./productRouter');

router.use('/user', userRouter);
router.use('/like', likeRouter);
router.use('/product', productRouter);
router.use('/products-events', productInfoRouter);
router.use('/cart', cartRouter.router);
router.use('/order', orderRouter);
router.use('/review', reviewRouter);
router.use('/event', eventCommentRouter);

module.exports = router;