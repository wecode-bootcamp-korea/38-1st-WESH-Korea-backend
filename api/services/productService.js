const productDao = require('../models/productDao');

const getProductList = async (categoryName, limit, offset, sort) => {
    try{
        const cateId =(categoryName !== "all")? await productDao.getCategoryId(categoryName) : 0;
        console.log(cateId);
        let order;
        limit = Number(limit);
        offset = Number(offset);
        const countBySelling = await productDao.getSELLCount();

        switch(sort){
            case "high" :
                order = `price DESC`;
                break;
            case "low" :
                order = `price ASC`;
                break;
            case "review" :
                order = `LEFT JOIN reviews r ON r.product_id = p.id
                WHERE sub_category_id = ?
                GROUP BY p.id
                ORDER BY COUNT(r.review)`;
                break;
            default :
                order = `AVG(r.score) + COUNT(up.product_id) / (${Number(await countBySelling[0].count)}) * 5 DESC`;
                break;
        }

        const productlist = await productDao.getProductList( cateId, limit, offset, order);

        for(let i=0; i<productlist.length; i++){
            const tagArr = [];
            const productid= await productlist[i].id;
            const tags = await productDao.getTagsByProduct(productid);

            for(let j=0; j<tags.length; j++) {
                tagArr.push(tags[j].name);
            }

            productlist[i].tag = tagArr;
        }

    return productlist;

    }
    catch(err){
        throw err;
    }
};

module.exports = {
    getProductList
}