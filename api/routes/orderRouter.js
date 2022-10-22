const router = require("express").Router();
const { loginRequired } = require("../utils/auth");

const orderController = require('../controllers/orderController');

router.post('/', loginRequired, orderController.orderAdd);

module.exports = router;