var orders = require('../controllers/orders.server.controller'),
	express = require('express'),
	router = express.Router();

router.route('/')
	.get(orders.get);

module.exports = router;