const express = require('express');
const productFilterController = require('../controllers/productFilterController');

const router = express.Router();

router.get('/', productFilterController.getProductsByFiltererCondition);

module.exports = router;