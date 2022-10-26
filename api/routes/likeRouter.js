const express = require('express');
const likeController = require('../controllers/likeController');
const authentication = require('../utils/auth');

const router = express.Router();

router.post('/click', authentication.loginRequired, likeController.addLike);
router.post('/delete', authentication.loginRequired, likeController.deleteLike);
router.post('/readall', authentication.loginRequired, likeController.getUserLikes);


module.exports = router;