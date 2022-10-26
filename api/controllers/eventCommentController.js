const eventCommentService = require('../services/eventCommentService');
const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils/error');

const getEvReview = catchAsync (async (req, res) => {

    const evReviewId = +req.params.evTitleId;
    const evReview = await eventCommentService.getEvReview(evReviewId);
    res.status(200).json({"data": evReview});
    
})

const createEvReview = catchAsync (async (req, res) => {

    const userId = req.user.id;
    const evReviewId = +req.params.evTitleId;
    const { content } = req.body;

    await eventCommentService.createEvReview(userId, content, evReviewId);
    res.status(201).json({"message": "EVENT_REVIEW_CREATED"}); 
   
})

const modifyEvReview = catchAsync (async (req, res) => {

    const userId = req.user.id;
    const evReviewId = +req.params.evTitleId;
    const { content } = req.body;

    await eventCommentService.modifyEvReview(userId, content, evReviewId);
    res.status(200).json({"message": "EVENT_REVIEW_MODIFIED"}); 
   
})

const deleteEvReview = catchAsync (async (req, res) => {

    const userId = req.user.id;
    const evReviewId = +req.params.evTitleId; 

    await eventCommentService.deleteEvReview(userId, evReviewId);
    res.status(200).json({"message": "EVENT_REVIEW_DELETED"}); 
    
})

module.exports = {
    getEvReview,
    createEvReview,
    modifyEvReview,
    deleteEvReview
}