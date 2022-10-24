const { appDataSource } = require("./appDataSource");

const getCategoryId = async(categoryName) => {

const cateId= await appDataSource.query(`
        SELECT 
            id
        FROM sub_categories
        WHERE name = ?
    `,
    [categoryName]
    );
return cateId[0].id;
}

const getSELLCount = async () =>{
    return appDataSource.query(`
        SELECT
            COUNT(*) AS count
        FROM user_product;
    `)
}
const getProductList= async(cateId, limit, offset, order)=>{
const input = [ limit, offset];
let query = !cateId ? `
    SELECT 
        p.id, 
        p.name AS title, 
        p.price, 
        thumbnail AS img, 
        sc.name AS category 
    FROM products p 
    JOIN sub_categories sc ON p.sub_category_id = sc.id 
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
    WHERE p.sub_category_id = 3
    ORDER BY ${order}
    LIMIT 16 OFFSET 0 ;` 
    if(cateId) input.unshift(cateId);
    let sol = await appDataSource.query(query, input);
    return sol;
}
//sql injection
const getProductListByReview= async(cateId, limit, offset)=>{
    const input = [limit, offset];
    let query = !cateId ? `
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
LIMIT ? OFFSET ? ;
        ` : `
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
    LIMIT ? OFFSET ? ;` ;
    
    if(cateId) input.unshift(cateId);
        
    return appDataSource.query(query, input);
    }

const getTagsByProduct = async (productId) =>{
    return appDataSource.query(`
        SELECT
            t.name
        FROM products p
        LEFT JOIN product_tag pt ON p.id=pt.product_id
        LEFT JOIN tags t ON t.id=pt.tag_id
        WHERE p.id = ?
    `, [productId])
    
}


module.exports = {
    getCategoryId,
    getProductList,
    getProductListByReview,
    getTagsByProduct,
    getSELLCount
}


