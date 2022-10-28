const router = require("express").Router();
const { loginRequired } = require("../utils/auth");

const orderController = require('../controllers/orderController');

router.post('/', loginRequired, orderController.addNewOrder);
router.post('/confirmation', loginRequired, orderController.completeOrderByUser);
router.post('/cancel', loginRequired, orderController.cancelOrderByUser);

module.exports = router;