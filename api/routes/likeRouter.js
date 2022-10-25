const express = require('express');
const likeController = require('../controllers/likeController');
const authentication = require('../utils/auth');

loginRequired
const router = express.Router();

router.post('/click',  likeController.addLike);
router.post('/delete',  likeController.deleteLike);
router.post('/readall', authentication.loginRequired, likeController.getUserLikes);


module.exports = router;