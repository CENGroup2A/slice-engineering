var orders = require('../controllers/orders.server.controller'),
	express = require('express'),
	router = express.Router();

router.route('/orders')
	.get(orders.list)
	.post(orders.create);

router.route('/:orderID')
	.get(orders.read)
	.put(orders.update)
	.delete(orders.delete);

router.param('orderID', orders.orderByID);

module.exports = router;