const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRoute');
const productFilterRouter = require('./productFilterRouter');

router.use('/user', userRouter);
router.use('/cart', cartRouter.router);
router.use('/price', productFilterRouter);

module.exports = router;