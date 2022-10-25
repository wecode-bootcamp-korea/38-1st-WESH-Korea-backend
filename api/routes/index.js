const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRoute');
const reviewRouter = require('./reviewRouter');

router.use('/user', userRouter);
router.use('/cart', cartRouter.router);
router.use('/review', reviewRouter);

module.exports = router;