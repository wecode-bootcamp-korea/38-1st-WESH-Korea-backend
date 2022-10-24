const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require ('./productRouter');

router.use('/user', userRouter);
router.use('/productlist', productRouter);


module.exports = router;