const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const mainRouter = require('./mainRouter');

router.use('/user', userRouter);
router.use('/', mainRouter);

module.exports = router;