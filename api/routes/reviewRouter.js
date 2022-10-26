const express = require('express');
const reviewController = require('../controllers/reviewController');
const {loginRequired} = require('../utils/auth');

const router = express.Router();

router.post('/:productId', loginRequired, reviewController.createReview);
router.put('/:productId', loginRequired, reviewController.modifyReview);
router.delete('/:productId', loginRequired, reviewController.deleteReview);
router.get('/:productId', reviewController.getReviews);

module.exports = router