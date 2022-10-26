const { appDataSource } = require("./appDataSource");

const productInfo = async (productId) => {
  const productInfo = await appDataSource.query(
    `SELECT
            p.name AS title,
            p.price,
            p.content AS detail,
            p.thumbnail AS img,
            p.manual,
            p.stock
        FROM products p
        WHERE p.id = ${productId}
        `
  );
  return productInfo;
};

const getCategoryId = async (categoryName) => {
  const categoryId = await appDataSource.query(
    `
      SELECT 
          id
      FROM sub_categories
      WHERE name = ?
    `,
    [categoryName]
  );
  return categoryId[0].id;
};

const getProductList = async (
  categoryId,
  limit,
  offset,
  joinExpression,
  isCategory,
  group,
  orderBy,
  limitOffset
) => {
  const input = [limit, offset];

  if (categoryId) input.unshift(categoryId);

  return await appDataSource.query(
    `
      SELECT 
          p.id, 
          p.name AS title, 
          p.price, 
          thumbnail AS img,
        sc.id AS categoryId,
          sc.name AS category
      FROM products p 
      JOIN sub_categories sc ON p.sub_category_id = sc.id
      ${joinExpression}
      ${isCategory}
      ${group}
      ORDER BY ${orderBy}
      ${limitOffset};
    `,
    input
  );
};

const getTagsByProduct = async (productId) => {
  return appDataSource.query(
    `
      SELECT
          t.name
      FROM products p
      LEFT JOIN product_tag pt ON p.id=pt.product_id
      LEFT JOIN tags t ON t.id=pt.tag_id
      WHERE p.id = ?
    `,
    [productId]
  );
};

module.exports = {
  getCategoryId,
  getProductList,
  getTagsByProduct,
  productInfo,
};
