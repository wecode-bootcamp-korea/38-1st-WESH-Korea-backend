const express=require("express");
const categoryController=require("../controllers/categoryController");

const router=express.Router();

router.get("/:categoryId", categoryController.divideCategory);
module.exports={
    router
};