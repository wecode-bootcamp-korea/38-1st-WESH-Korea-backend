const productDao = require("../models/productDao");

const getProductList = async (categoryName, limit, offset, sort) => {
  let categoryId = categoryName;
  if (isNaN) {
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

  for (let i = 0; i < result.length; i++) {
    const tagArr = [];
    const productid = result[i].id;
    const tags = await productDao.getTagsByProduct(productid);

    for (let j = 0; j < tags.length; j++) {
      tagArr.push(tags[j].name);
    }

    result[i].tag = tagArr;
  }

  return result;
};

module.exports = {
  getProductList,
};
