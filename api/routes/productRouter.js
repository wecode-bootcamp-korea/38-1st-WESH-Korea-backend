const express = require('express');

const productController=require('../controllers/productController');

const router = express.Router();

router.get('/:id', productController.productInfo);
router.get('/list/:categoryName', productController.getProductList);

module.exports = { router };

