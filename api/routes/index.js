const express=require("express");
const router=express.Router();

const productRouter=require("./productRouter");
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use("/productlist", productRouter.router);

module.exports=router;