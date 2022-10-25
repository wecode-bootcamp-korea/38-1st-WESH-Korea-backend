const likeDao = require("../models/likeDao");

const addLike = async (user, productId) => {
  let result;

  const check = await likeDao.checkLike(user, productId);
  
  if (check.length) {
        result = await likeDao.deleteLike(user, productId);
    } else {
        result = await likeDao.putLike(user, productId).insertId;
    }
    
    return result;
};

const deleteLike = async (user, productId) => {

    const check = await likeDao.checkLike(user, productId);

    if(!check.length){
        const error = new Error( "DONT_EXIST_IN_DATABASE" );
        error.statusCode = 400;
        throw error;
    }
    return deleteLike(user, productId);
}

const getUserLikes = async (user) => {
    const userLike = await likeDao.getUserLikes(user);
    return userLike;
}

module.exports = {
  addLike,
  deleteLike,
  getUserLikes
};