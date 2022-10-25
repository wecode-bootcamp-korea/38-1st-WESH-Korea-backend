const { appDataSource } = require("./appDataSource");

const getCategoryId = async (categoryName) => {
  const categoryId = await appDataSource.query(`   
    SELECT 
      id
    FROM sub_categories
    WHERE name = ?
    `,
    [categoryName]
  );
  return categoryId[0].id;
};

const getProductList = async (categoryId, limit, offset, order) => {
  const input = [limit, offset];
  let query = !categoryId ? `
    SELECT 
      p.id, 
      p.name AS title, 
      p.price, 
      thumbnail AS img, 
      sc.name AS category
    FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN reviews r ON r.product_id = p.id 
    GROUP BY p.id
    ORDER BY ${order}
    LIMIT ? OFFSET ? ;
    ` : `
    SELECT 
    	p.id, 
    	p.name AS title, 
    	p.price, 
    	thumbnail AS img, 
    	sc.name AS category
    FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN reviews r ON r.product_id = p.id 
    WHERE sub_category_id = ?
    GROUP BY p.id 
    ORDER BY ${order}
    LIMIT ? OFFSET ?;
    `;

  if (categoryId) input.unshift(categoryId);

  let sol = await appDataSource.query(query, input);
  return sol;
};

const getProductListByReview = async (categoryId, limit, offset) => {
  const input = [limit, offset];
  let query = !categoryId ? `
    SELECT 
    	p.id, 
    	p.name AS title, 
    	p.price, 
    	thumbnail AS img, 
    	sc.name AS category,
      COUNT(r.product_id)
    FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN reviews r ON r.product_id = p.id 
    GROUP BY p.id 
    ORDER BY COUNT(r.product_id) DESC
    LIMIT ? OFFSET ? ;
        `
    : `
    SELECT 
      p.id, 
      p.name AS title, 
      p.price, 
      thumbnail AS img, 
      sc.name AS category,
      COUNT(r.product_id)
    FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN reviews r ON r.product_id = p.id 
    WHERE sub_category_id = ?
    GROUP BY p.id 
    ORDER BY COUNT(r.product_id) DESC
    LIMIT ? OFFSET ? ;`;

  if (categoryId) input.unshift(categoryId);

  return appDataSource.query(query, input);
};

const getProductListByHowManySelled = async (categoryId, limit, offset) => {
  const input = [limit, offset];
  let query = !categoryId ? `
    SELECT 
      p.id,
      p.name AS title, 
      p.price, 
      thumbnail AS img, 
      sc.name AS category,
      COUNT(up.product_id)
      FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN user_product up ON up.product_id = p.id 
    GROUP BY p.id 
    ORDER BY COUNT(up.product_id) DESC
    LIMIT ? OFFSET ? ;`
    : `
    SELECT 
      p.id, 
      p.name AS title, 
      p.price, 
      thumbnail AS img, 
      sc.name AS category,
      COUNT(up.product_id)
    FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN user_product up ON up.product_id = p.id 
    WHERE sub_category_id = ?
    GROUP BY p.id 
    ORDER BY COUNT(up.product_id) DESC
    LIMIT ? OFFSET ? ;`;

  if (categoryId) input.unshift(categoryId);

  return appDataSource.query(query, input);
};

const getTagsByProduct = async (productId) => {
  return appDataSource.query(`
    SELECT
      t.name
    FROM products p
    LEFT JOIN product_tag pt ON p.id=pt.product_id
    LEFT JOIN tags t ON t.id=pt.tag_id
    WHERE p.id = ?
    `, [productId]
  );
};

module.exports = {
  getCategoryId,
  getProductList,
  getProductListByReview,
  getProductListByHowManySelled,
  getTagsByProduct,
};
