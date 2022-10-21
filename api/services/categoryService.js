const categoryDao=require("../models/categoryDao");

const divideCategory=async(categoryId, offset, limit, ordering)=>{
   try{ 
    switch(categoryId){
        case "lotion":
            categoryId=3;
            break;
        case "oil":
            categoryId=1;
            break;
        case "perfume":
            categoryId=2;
            break;
        case "soap":
            categoryId=4;
            break;
            case "all":
            categoryId=0;
            break;
        default : 
            const err=new Error("CAN NOT FIND MATCH CATEGORY");
            throw err;
    }
    switch(ordering){
        case "낮은 가격순":
            ordering="price";
            break;
        case "높은 가격순":
            ordering="price DESC";
            break;
        default : 
            ordering="price"
    }
    return categoryId?categoryDao.getCategoryInfo(categoryId, offset, limit, ordering):categoryDao.getCategoryInfoAll(offset, limit,ordering);
    } catch (err){
        throw err;
    }


}

module.exports={
    divideCategory
}