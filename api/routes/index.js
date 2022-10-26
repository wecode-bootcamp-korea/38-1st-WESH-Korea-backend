const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productInfoRouter = require('./productInfoRouter');
const cartRouter = require('./cartRoute');
const eventCommentRouter = require('./eventCommentRouter');

router.use('/user', userRouter);
router.use('/products-events', productInfoRouter);
router.use('/cart', cartRouter.router);
router.use('/event', eventCommentRouter);

module.exports = router;