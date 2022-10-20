const categoryService=require("../services/categoryController");


const divideCategory=async(req,res)=>{
    const {categoryId}=req.params;
    const {limit, offset}=req.query;

    
    try {
        if(!categoryId||!limit||!offset){
            return res.status(400).json({"message":"What do you want?"});
        }
        await categoryService.divideCategory(categoryId, offset, limit);
        return res.status(201).json("Loading Success");
    } catch(err){
        console.error(err);
    }
}

module.exports={
    divideCategory
};