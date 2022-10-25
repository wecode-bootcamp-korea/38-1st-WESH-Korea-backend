const likeService = require("../services/likeService");

const addLike = async (req, res) => {
  const { user } = req.body;
  const { productId } = req.body;

  try {
    if (!user || !productId) {
      const error = new Error("UNDEFINED_REQUIRED_INPUT");
      error.statusCode=404;
      throw error;
    }

    const data = await likeService.addLike(user, productId);
    res.status(201).json({ message: "FUNCTION_SUCCESS", data: data });
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
};

const deleteLike = async (req, res) => {
  const { user } = req.body;
  const { productId } = req.body;

  try {
    if(!user || !productId) {
        const error = new Error("NOT_FOUND_INPUT");
        error.statusCode = 400;
        throw error;
    }
    const data = await likeService.deleteLike(user, productId);

    res.status(201).json({ message: "LIKE_DELETED", data: data });
} catch (error) {
    res.status(error.statusCode||500).json(error.message);
}
};

const getUserLikes = async (req, res) => {
    const { user } = req.body;
    console.log(user);
  try {
    const data = await likeService.getUserLikes(user);
    res.status(201).json({ message: "LOADING_SUCCESS", data: data });
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
};

module.exports = { addLike, deleteLike, getUserLikes };
