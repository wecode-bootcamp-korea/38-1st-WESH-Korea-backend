const express = require('express');
const eventCommentController = require('../controllers/eventCommentController');
const {loginRequired} = require('../utils/auth');

const router = express.Router();

router.get('/:evTitleId', eventCommentController.getEvReview);
router.post('/:evTitleId', loginRequired, eventCommentController.createEvReview);
router.put('/:evTitleId', loginRequired, eventCommentController.modifyEvReview);
router.delete('/:evTitleId', loginRequired, eventCommentController.deleteEvReview);

module.exports = router