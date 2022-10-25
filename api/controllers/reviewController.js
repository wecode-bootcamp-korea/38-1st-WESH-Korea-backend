const reviewService = require('../services/reviewService');
const jwt = require('jsonwebtoken');

const getReviews = async (req, res) => {

    const productId = +req.params.productId;

    try {
        const reviews = await reviewService.getReviews(productId);
        res.status(200).json({"data": reviews });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const createReview = async (req, res) => {
    
    const userId = req.user.id;
    const productId = +req.params.productId;
    const {content, score} = req.body;

    try {
        await reviewService.createReview(userId, productId, content, score);
        res.status(201).json({"message": "REVIEW_CREATED"});
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const modifyReview = async (req, res) => {
    
    const userId = req.user.id;
    const productId = +req.params.productId;
    const {content, score} = req.body;

    try{
        await reviewService.modifyReview(userId, productId, content, score);
        res.status(200).json({"message": "REVIEW_MODIFYED"});
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const deleteReview = async (req, res) => {
    
    const userId = req.user.id;
    const productId = +req.params.productId;

    try{
        await reviewService.deleteReview(userId, productId);
        res.status(200).json({"message": "REVIEW_DELETED"});
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
} 

module.exports = {
    getReviews,
    createReview,
    modifyReview,
    deleteReview
}