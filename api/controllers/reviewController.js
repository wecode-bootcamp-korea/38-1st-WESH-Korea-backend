const reviewService = require('../services/reviewService');
const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils/error');

const getReviews = catchAsync (async (req, res) => {

    const productId = +req.params.productId;
    const reviews = await reviewService.getReviews(productId);
    res.status(200).json({"data": reviews });
    
});

const createReview = catchAsync (async (req, res) => {
    
    const userId = req.user.id;
    const productId = +req.params.productId;
    const {content, score} = req.body;

    await reviewService.createReview(userId, productId, content, score);
    res.status(201).json({"message": "REVIEW_CREATED"});
  
});

const modifyReview = catchAsync (async (req, res) => {
    
    const userId = req.user.id;
    const productId = +req.params.productId;
    const {content, score} = req.body;

    await reviewService.modifyReview(userId, productId, content, score);
    res.status(200).json({"message": "REVIEW_MODIFYED"});
   
});

const deleteReview = catchAsync (async (req, res) => {
    
    const userId = req.user.id;
    const productId = +req.params.productId;

    await reviewService.deleteReview(userId, productId);
    res.status(200).json({"message": "REVIEW_DELETED"});
   
});

module.exports = {
    getReviews,
    createReview,
    modifyReview,
    deleteReview
}