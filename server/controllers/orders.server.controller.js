var mongoose = require('mongoose'),
	Order = require('../models/orders.server.model');

// Create an order
exports.create = (req, res) => {

	var order = new Order({
		order_number: req.body.order_number,
		status: req.body.status
	});

	order.save(err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(order);
		}
	});

}

// Get an order
exports.read = (req, res) => {
	res.json(req.order);
}

// Update an order
exports.update = (req, res) => {
	
	var order = req.order;

	order.order_number = req.body.order_number;
	order.status = req.body.status;

	order.save(err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(order);
		}
	});

}

// Delete an order
exports.delete = (req, res) => {

	var order = req.order;

	Order.findOneAndDelete({ order_number: order.order_number }, err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(order);
		}
	});

}

// Retrieve all orders
exports.list = (req, res) => {

	Order.find().exec((err, orders) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(orders);
		}
	});

}

// Middleware for finding a order by its ID
exports.orderByID = (req, res, next, id) => {

	Order.findById(id).exec((err, order) => {
		if (err) {
			res.status(500).send(err);
		} else {
			req.order = order;
			next();
		}
	});

};