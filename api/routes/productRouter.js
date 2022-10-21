const express=require("express");
const productController=require("../controllers/productController");

const router=express.Router();

router.get("/:categoryId", productController.divideCategory);
module.exports={
    router
};