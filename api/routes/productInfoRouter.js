const express = require('express');
const productInfoController = require('../controllers/productInfoController');

const router = express.Router();

router.get('/', productInfoController.getDetailProducts);

module.exports = router