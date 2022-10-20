const { appDataSource } = require("./appDataSource");

const getCategoryInfo= async(categoryId, offset, limit) => {
   try {
     const product= await appDataSource.query(`
      SELECT 
        id,
        name,
        price,
        thumbnail
      FROM products
      WHERE sub_category_id=?
      LIMIT ? OFFSET ?
    `,
    [categoryId, Number(limit), Number(offset)]);
    
    await console.log(categoryId)
    await console.log(product);
    for(let i=0; i<product.length; i++){
      const productId=await product[i].id;
      const tags=[];
      const tagArr= await appDataSource.query(`
        SELECT
          tags.name
        FROM product_tag pt
        INNER JOIN tags ON pt.tag_id=tags.id
        WHERE pt.product_id=?
      `,
      [productId]
      )
     for(let j=0; j<tagArr.length; j++){
          tags.push(tagArr[j].name);
      }
      product[i]["tags"]= await tags;
    }
     console.log(product)
     return product;
    } catch (err) {
      throw err;
    }
  }
  const getCategoryInfoAll=async(offset, limit)=>{
    try {
      const product= await appDataSource.query(`
      SELECT 
      id,
      name,
      price,
      thumbnail
      FROM products
      LIMIT ? OFFSET ?
      `,
      [Number(limit), Number(offset)]);
      for(let i=0; i<product.length; i++){
        const productId=await product[i].id;
     const tags=[];
     const tagArr= await appDataSource.query(`
     SELECT
     tags.name
     FROM product_tag pt
     INNER JOIN tags ON pt.tag_id=tags.id
     WHERE pt.product_id=?
     `,
     [productId]
     )
     for(let j=0; j<tagArr.length; j++){
       tags.push(tagArr[j].name);
      }
      product[i]["tags"]= await tags;
    }
    console.log(product)
    return product;
  } catch (err) {
    throw err;
  }
}

 
// - product 이름, 이미지, 태그, 가격
// - product 총 갯수& 각 카테고리별 product 갯수


module.exports = { getCategoryInfo, getCategoryInfoAll };


// appDataSource.query