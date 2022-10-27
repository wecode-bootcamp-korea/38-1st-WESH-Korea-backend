const eventCommentDao = require('../models/eventCommentDao');

const getEventReview = async (eventReviewId) => {

    const eventReview = await eventCommentDao.getEventReview(eventReviewId);
    return eventReview;
}

const createEventReview = async (userId, content, eventReviewId) => {

    const checkOwnReview = await eventCommentDao.checkOwnReview(userId, eventReviewId);

    if(checkOwnReview.length !== 0){
        const error = new Error("Duplicated Entry");
        error.statusCode = 400;
		throw error;
    }

    return await eventCommentDao.createEventReview(userId, content, eventReviewId);
    
}

const modifyEventReview = async (userId, content, eventReviewId) => {

    const checkOwnReview = await eventCommentDao.checkOwnReview(userId, eventReviewId);

    if(!checkOwnReview.length){
        const error = new Error("NO_PERMISSION");
        error.statusCode = 401;
		throw error;
    }

    return await eventCommentDao.modifyEventReview(userId, content, eventReviewId);
}

const deleteEventReview = async (userId, eventReviewId) => {

    const checkOwnReview = await eventCommentDao.checkOwnReview(userId, eventReviewId);
   
    if(!checkOwnReview.length){
        const error = new Error("NO_REVIEW");
        error.statusCode = 400;
		throw error;
    }

    return await eventCommentDao.deleteEventReview(userId, eventReviewId);
}


module.exports = {
    getEventReview,
    createEventReview,
    modifyEventReview,
    deleteEventReview
}