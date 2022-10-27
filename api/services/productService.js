const productDao = require("../models/productDao");
const reivewDao = require('../models/reviewDao');

const productInfo = async (productId) => {
    
  const product = await productDao.productInfo(productId);
  const reviews = await reivewDao.getReviews(productId);

  if(!product.length){
      const error =  new Error("PRODUCT_DOES_NOT_EXIST");
      error.statusCode = 400;
      throw error;
  }

  return [...product, ...reviews];
}

const getProductList = async (categoryName, limit, offset, sort) => {
  let categoryId = categoryName;
  if (isNaN(categoryId)) {
    categoryId =
      categoryName !== "all" ? await productDao.getCategoryId(categoryName) : 0;
  } else categoryId = Number(categoryName);

  limit = Number(limit);
  offset = Number(offset);

  let joinExpression = "", isCategory = "", group = "", orderBy = "";
  isCategory = categoryId ? "WHERE sub_category_id = ?" : "";
  const limitOffset = "LIMIT ? OFFSET ? ;";

  switch (sort) {
    case "high":
      orderBy = " price DESC";
      break;

    case "low":
      orderBy = " price";
      break;

    case "review":
      joinExpression = "LEFT JOIN reviews r ON r.product_id = p.id";
      group = "GROUP BY p.id";
      orderBy = " COUNT(r.product_id) DESC";
      break;

    default:
      joinExpression = "LEFT JOIN user_product up ON up.product_id = p.id";
      group = "GROUP BY p.id";
      orderBy = " COUNT(up.product_id) DESC";
      break;
  }
  const result = await productDao.getProductList(
    categoryId,
    limit,
    offset,
    joinExpression,
    isCategory,
    group,
    orderBy,
    limitOffset
  );

  for (let baseNumberOne = 0; baseNumberOne < result.length; baseNumberOne++) {
    const tagArr = [];
    const productid = result[baseNumberOne].id;
    const tags = await productDao.getTagsByProduct(productid);

    for (let baseNumberTwo = 0; baseNumberTwo < tags.length; baseNumberTwo++) {
      tagArr.push(tags[baseNumberTwo].name);
    }

    result[baseNumberOne].tag = tagArr;
  }

  return result;
};

module.exports = {
  getProductList,
  productInfo
};
