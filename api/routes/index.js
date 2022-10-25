const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');

router.use('/user', userRouter);
router.use('/like', likeRouter);

module.exports = router;