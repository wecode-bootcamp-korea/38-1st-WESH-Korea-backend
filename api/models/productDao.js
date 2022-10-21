const { appDataSource } = require("./appDataSource");

const getCategoryInfo = async (categoryId, offset, limit) => {
  try {
    const query = categoryId
      ? `
      SELECT 
        id,
        name AS title,
        price,
        thumbnail AS img,
        sub_category_id AS category
      FROM products
      WHERE sub_category_id=?
      LIMIT ? OFFSET ?
     `
      : `
      SELECT 
        id,
        name AS title,
        price,
        thumbnail AS img,
        sub_category_id AS category
      FROM products
      LIMIT ? OFFSET ?
    `;

    const queryParameters = categoryId
      ? [categoryId, Number(limit), Number(offset)]
      : [Number(limit), Number(offset)];

    const product = await appDataSource.query(query, queryParameters);
console.log(product);
    for (let i = 0; i < product.length; i++) {
      const productId = product[i].id;
      const categoryId = product[i].category;

      // await console.log(categoryId);
      const category = await appDataSource.query(`
        SELECT 
          name
        FROM sub_categories
        WHERE id=?
      `,[categoryId]);
      product[i].category=category[0].name;
      const tags = [];
      const tagArr = await appDataSource.query(`
           SELECT
              tags.name
            FROM product_tag pt
            INNER JOIN tags ON pt.tag_id=tags.id
            WHERE pt.product_id=?
          `,
        [productId]
      );
      for (let j = 0; j < tagArr.length; j++) {
        tags.push(tagArr[j].name);
      }
      product[i]["tags"] = await tags;
    }
    return product;
  } catch (err) {
    throw err;
  }
};

module.exports = { getCategoryInfo };
