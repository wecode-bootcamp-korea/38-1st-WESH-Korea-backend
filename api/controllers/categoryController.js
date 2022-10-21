const categoryService=require("../services/categoryService");


const divideCategory=async(req,res)=>{
    const { categoryId } = req.params;
    const {limit, offset} = req.query;
    const {ordering} = req.body;
    try {
        if(!limit||!offset){
            return res.status(400).json({"message":"What do you want?"});
        }
        const result = await categoryService.divideCategory(categoryId, offset, limit, ordering);
        return res.status(201).json({"message":"Loading Success", data:result
    });
    } catch(err){
        return new Error("YOU HAVE IN TROUBLE");
    }
}

module.exports={
    divideCategory
};