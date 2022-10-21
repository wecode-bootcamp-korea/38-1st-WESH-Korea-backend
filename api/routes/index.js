const express=require("express");

const router=express.Router();

const categoryRouter=require("./categoryRouter");


router.use("/productlist", categoryRouter.router);

module.exports=router;