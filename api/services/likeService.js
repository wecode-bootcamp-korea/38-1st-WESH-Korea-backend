const likeDao = require("../models/likeDao");

const clickLike = async (userId, productId) => {

    const duplication = await likeDao.checkLike(userId, productId);

    if (!duplication) {
      return likeDao.makeLike(userId, productId);
    } 
    // else {
    //   return likeDao.deleteLike(userId, productId);
    // }

};

module.exports = {
  clickLike,
};
