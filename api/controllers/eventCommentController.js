const eventCommentService = require('../services/eventCommentService');
const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils/error');

const getEventReview = catchAsync (async (req, res) => {

    const eventReviewId = +req.params.eventTitleId;
    const eventReview = await eventCommentService.getEventReview(eventReviewId);
    res.status(200).json({"data": eventReview});
    
})

const createEventReview = catchAsync (async (req, res) => {

    const userId = req.user.id;
    const eventReviewId = +req.params.eventTitleId;
    const { content } = req.body;

    await eventCommentService.createEventReview(userId, content, eventReviewId);
    res.status(201).json({"message": "EVENT_REVIEW_CREATED"}); 
   
})

const modifyEventReview = catchAsync (async (req, res) => {

    const userId = req.user.id;
    const eventReviewId = +req.params.eventTitleId;
    const { content } = req.body;

    await eventCommentService.modifyEventReview(userId, content, eventReviewId);
    res.status(200).json({"message": "EVENT_REVIEW_MODIFIED"}); 
   
})

const deleteEventReview = catchAsync (async (req, res) => {

    const userId = req.user.id;
    const eventReviewId = +req.params.eventTitleId; 

    await eventCommentService.deleteEventReview(userId, eventReviewId);
    res.status(200).json({"message": "EVENT_REVIEW_DELETED"}); 
    
})

module.exports = {
    getEventReview,
    createEventReview,
    modifyEventReview,
    deleteEventReview
}