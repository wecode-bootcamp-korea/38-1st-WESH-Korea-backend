const express = require('express');
const userController = require('../controllers/userController');
const {loginRequired} = require('../utils/auth');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/mypage', loginRequired, userController.getUserDetail);

module.exports = router;