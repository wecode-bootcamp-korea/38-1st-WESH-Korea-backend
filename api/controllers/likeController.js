const likeService = require('../services/likeService');

const addLike = async (req, res) => {
    const { user } = req.user;
    const { productId } = req.body;

    try{
        if( !user || !body ){
            const error = new Error("UNDEFINED_REQUIRED_INPUT");    
        }

        const data = await likeService.addLike(user, productId);
        res.status(201).json({message : ""})
    } catch (error){

    }
}

module.exports = { addLike };