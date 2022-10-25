const express = require('express');
const likeController = require('../controllers/likeController');
const authentication = require('../utils/auth');

const router = express.Router();

router.post('/click',  likeController.addLike);

module.exports = router;
