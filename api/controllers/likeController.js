const likeService = require('../services/likeService');

const clickLike = async (req, res) => {
    // const { user } = req.user;
    const {userId, productId} = req.body;

    try {
        if(!userId||!productId){
            const error = new Error("CANNOT_FIND_INPUT");
        }
        const data = await likeService.clickLike(userId, productId); 

        res.status(200).json({ message: "REQUIRE_SUCCESS" });

    } catch (error) {
        res.status(error.statusCode).json(error.message);
    }
}

module.exports = {
    clickLike,
}