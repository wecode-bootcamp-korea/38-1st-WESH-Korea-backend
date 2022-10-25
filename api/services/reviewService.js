const reviewDao = require('../models/reviewDao');

const getReviews = async (productId) => {

    const reviewList = await reviewDao.getReviews(productId);

    if(!reviewList.length){
        const error = new Error("NO_REVIEW");
		error.statusCode = 400;
		throw error;
    }

    return reviewList;
}

const createReview  = async (userId, productId, content, score) => {
    
    const checkProduct = await reviewDao.checkUserProduct(userId, productId);
    const checkReview = await reviewDao.checkUserReview(userId, productId);
    
    if(!checkProduct.length){
        const error = new Error("YOU_DIDN'T_BUY_THIS_ITEM");
        error.statusCode = 400;
		throw error;
    }

    if(checkReview.length!==0){
        const error = new Error("YOU_ALREADY_WROTE_REVIEW");
        error.statusCode = 400;
		throw error;
    }
    
    return await reviewDao.createReview(userId, productId, content, score);
}

const modifyReview = async (userId, productId, content, score) => {

    const checkProduct = await reviewDao.checkUserProduct(userId, productId);

    if(!checkProduct.length){
        const error = new Error("NO_PERMISSION");
        error.statusCode = 400;
		throw error;
    }

    return await reviewDao.modifyReview(userId, productId, content, score);
}

const deleteReview = async (userId, productId) => {

    const checkProduct = await reviewDao.checkUserProduct(userId, productId);
    const checkReview = await reviewDao.checkUserReview(userId, productId);

    if(!checkProduct.length){
        const error = new Error("NO_PERMISSION");
        error.statusCode = 400;
		throw error;
    }

    if(!checkReview.length){
        const error = new Error("NO_REVIEW");
        error.statusCode = 400;
		throw error;
    }

    return await reviewDao.deleteReview(userId, productId);
}

module.exports = {
    getReviews,
    createReview,
    modifyReview,
    deleteReview
}