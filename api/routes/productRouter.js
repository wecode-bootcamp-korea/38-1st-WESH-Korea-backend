const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('list/:categoryName', productController.getProductList);
router.get('/:id', productController.productInfo);

module.exports = router