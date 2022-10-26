const likeService = require("../services/likeService");
const { catchAsync } = require('../utils/error');

const addLike = catchAsync(async (req, res) => {
  const { user } = req.user;
  const { productId } = req.body;

    if (!user || !productId) {
      const error = new Error("UNDEFINED_REQUIRED_INPUT");
      error.statusCode=404;
      throw error;
    }

    const data = await likeService.addLike(user, productId);
    res.status(201).json({ message: "FUNCTION_SUCCESS", data: data });

});

const deleteLike = catchAsync( async (req, res) => {
  const { user } = req.user;
  const { productId } = req.body;

    if(!user || !productId) {
        const error = new Error("NOT_FOUND_INPUT");
        error.statusCode = 400;
        throw error;
    }
    const data = await likeService.deleteLike(user, productId);

    res.status(201).json({ message: "LIKE_DELETED", data: data });

});

const getUserLikes = catchAsync(async (req, res) => {
    const { user } = req.user;
    const data = await likeService.getUserLikes(user);

    res.status(201).json({ message: "LOADING_SUCCESS", data: data });
});

module.exports = { addLike, deleteLike, getUserLikes };
