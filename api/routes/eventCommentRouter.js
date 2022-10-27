const express = require('express');
const eventCommentController = require('../controllers/eventCommentController');
const {loginRequired} = require('../utils/auth');

const router = express.Router();

router.get('/:eventTitleId', eventCommentController.getEventReview);
router.post('/:eventTitleId', loginRequired, eventCommentController.createEventReview);
router.put('/:eventTitleId', loginRequired, eventCommentController.modifyEventReview);
router.delete('/:eventTitleId', loginRequired, eventCommentController.deleteEventReview);

module.exports = router