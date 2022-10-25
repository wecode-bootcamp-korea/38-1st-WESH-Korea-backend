const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/click',  likeController.addLike);
router.post('/delete',  likeController.deleteLike);
router.post('/readall',  likeController.getUserLikes);


module.exports = router;