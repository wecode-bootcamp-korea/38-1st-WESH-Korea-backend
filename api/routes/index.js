const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productInfoRouter = require('./productInfoRouter');
const cartRouter = require('./cartRoute');
const productFilterRouter = require('./productFilterRouter');
const eventCommentRouter = require('./eventCommentRouter');
const reviewRouter = require('./reviewRouter');
const productRouter = require('./productRouter');


router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/products-events', productInfoRouter);
router.use('/cart', cartRouter.router);
router.use('/price', productFilterRouter);
router.use('/event', eventCommentRouter);
router.use('/review', reviewRouter);



module.exports = router;