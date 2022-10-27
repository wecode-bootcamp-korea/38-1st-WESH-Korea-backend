const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productInfoRouter = require('./productInfoRouter');
const cartRouter = require('./cartRoute');
<<<<<<< HEAD
const orderRouter = require('./orderRouter');
=======
const eventCommentRouter = require('./eventCommentRouter');
>>>>>>> main
const reviewRouter = require('./reviewRouter');
const productRouter = require('./productRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/products-events', productInfoRouter);
router.use('/cart', cartRouter.router);
<<<<<<< HEAD
router.use('/order', orderRouter);
router.use('/review', reviewRouter);

=======
router.use('/event', eventCommentRouter);
router.use('/review', reviewRouter);



>>>>>>> main
module.exports = router;