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
    const input = [order, limit, offset];
    let queryByCategory;
    if(!cateId){
        queryByCategory =
        `SELECT
        p.id,
        p.name AS title,
        p.price,
        thumbnail AS img,
        sc.name AS category
    FROM products p
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    ?
    LIMIT ? OFFSET ?;`;
    } else {
        input.unshift(cateId);
        queryByCategory =
        `SELECT
            p.id,
            p.name AS title,
            p.price,
            thumbnail AS img,
            sc.name AS category,
            COUNT(r.content)
        FROM products p
        JOIN sub_categories sc ON p.sub_category_id = sc.id
        LEFT JOIN reviews r ON r.product_id = p.id
        LEFT JOIN user_product up ON up.product_id = p.id
        WHERE sub_category_id = ?
        GROUP BY p.id
        ORDER BY ?
        LIMIT ? OFFSET ?;`;
    }
    return appDataSource.query(queryByCategory, input);
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
    getTagsByProduct,
    getSELLCount
}


