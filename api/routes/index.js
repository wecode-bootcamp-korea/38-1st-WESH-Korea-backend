const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productInfoRouter = require('./productInfoRouter');

router.use('/user', userRouter);
router.use('/', productInfoRouter);

module.exports = router;