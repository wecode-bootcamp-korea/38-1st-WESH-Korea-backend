const productDao = require('../models/productDao');

const getProductList = async (categoryName, limit, offset, sort) => {
    try{
        const cateId =(categoryName !== "all")? await productDao.getCategoryId(categoryName) : 0;
        let order;
        limit = Number(limit);
        offset = Number(offset);

        let productlist;
        switch(sort){
            case "high" :
                order = `price DESC`;
                productlist=await productDao.getProductList( cateId, limit, offset, order);
                break;

            case "low" :
                order = `price`;
                productlist=await productDao.getProductList( cateId, limit, offset, order);
                break;

            case "review" :
                productlist=await productDao.getProductListByReview(cateId, limit, offset);
                break;
                
            default :
                productlist=await productDao.getProductListByHowManySelled(cateId, limit, offset);
                break;
        }


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