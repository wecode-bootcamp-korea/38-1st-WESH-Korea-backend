const eventCommentDao = require('../models/eventCommentDao');

const getEvReview = async (evReviewId) => {

    const evReview = await eventCommentDao.getEvReview(evReviewId);
    return evReview;
}

const createEvReview = async (userId, content, evReviewId) => {

    const checkOwnReview = await eventCommentDao.checkOwnReview(userId, evReviewId);

    if(checkOwnReview.length !== 0){
        const error = new Error("YOU_ALREADY_WROTE_THIS_REVIEW");
        error.statusCode = 400;
		throw error;
    }

    return await eventCommentDao.createEvReview(userId, content, evReviewId);
    
}

const modifyEvReview = async (userId, content, evReviewId) => {

    const checkOwnReview = await eventCommentDao.checkOwnReview(userId, evReviewId);

    if(!checkOwnReview.length){
        const error = new Error("YOU_DIDN'T_WRITE_THIS_REVIEW");
        error.statusCode = 400;
		throw error;
    }

    return await eventCommentDao.modifyEvReview(userId, content, evReviewId);
}

const deleteEvReview = async (userId, evReviewId) => {

    const checkOwnReview = await eventCommentDao.checkOwnReview(userId, evReviewId);
   
    if(!checkOwnReview.length){
        const error = new Error("THERE_IS_NO_REVIEW");
        error.statusCode = 400;
		throw error;
    }

    return await eventCommentDao.deleteEvReview(userId, evReviewId);
}


module.exports = {
    getEvReview,
    createEvReview,
    modifyEvReview,
    deleteEvReview
}