const productService=require("../services/productService");


const divideCategory=async(req,res)=>{
    const { categoryId } = req.params;
    const {limit, offset} = req.query;
    try {
        if(!limit||!offset){
            return res.status(400).json({"message":"What do you want?"});
        }

        const result = await productService.divideCategory(categoryId, offset, limit);
        console.log("result : "+result)
        return res.status(201).json({"message":"Loading Success", data:result
    });
    } catch(err){
        return new Error("YOU HAVE IN TROUBLE");
    }
}

module.exports={
    divideCategory
};