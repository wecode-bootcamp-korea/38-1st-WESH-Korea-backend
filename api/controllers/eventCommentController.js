const eventCommentService = require('../services/eventCommentService');
const jwt = require('jsonwebtoken');

const getEvReview = async (req, res) => {

    const evReviewId = +req.params.evTitleId;

    try{
        const evReview = await eventCommentService.getEvReview(evReviewId);
        res.status(200).json({"data": evReview});
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const createEvReview = async (req, res) => {

    const userId = req.user.id;
    const evReviewId = +req.params.evTitleId;
    const { content } = req.body;

    try{
        await eventCommentService.createEvReview(userId, content, evReviewId);
        res.status(201).json({"message": "EVENT_REVIEW_CREATED"}); 
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const modifyEvReview = async (req, res) => {

    const userId = req.user.id;
    const evReviewId = +req.params.evTitleId;
    const { content } = req.body;

    try{
        await eventCommentService.modifyEvReview(userId, content, evReviewId);
        res.status(200).json({"message": "EVENT_REVIEW_MODIFIED"}); 
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const deleteEvReview = async (req, res) => {

    const userId = req.user.id;
    const evReviewId = +req.params.evTitleId; 

    try{
        await eventCommentService.deleteEvReview(userId, evReviewId);
        res.status(200).json({"message": "EVENT_REVIEW_DELETED"}); 
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    getEvReview,
    createEvReview,
    modifyEvReview,
    deleteEvReview
}