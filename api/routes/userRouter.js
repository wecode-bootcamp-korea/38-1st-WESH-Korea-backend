const express = require('express');
const userController = require('../controllers/userController');
const authentication = require('../utils/auth');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/mypage', authentication.loginRequired, userController.getMyPage);

module.exports = router;