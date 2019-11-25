var mongoose = require('mongoose'),
	Order = require('../models/orders.server.model');
	OrderEmailCode = require('../models/ordercode.server.model');

	
	
	//sends a confirmation email after an order is placed
	function sendOrderConfirmation(codeData)
	{
		sgMail.setApiKey(config.sendGrid.APIKey);
		const msg = {
			to: codeData.email,
			from: 'noreply@slice-engineering.com',
			subject: 'Slice Engineering CAD Upload Order Confirmation',
			text: "Hello, "
			+ codeData.username +
			"\n\nThis email is to confirm that you have succesfully placed an order for a CAD upload file\n" +
			"Your orderID is " + codeData.order_number
		};
		sgMail.send(msg);
	}


// Create an order
exports.create = (req, res) => {

	var order = new Order({
		user_id: req.body.user_id,
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

	//test to see if session user is found
	console.log("current session username: " + req.user.username);
	//meant to get the session's current user and send an email based on data gotten
	var codeData = new OrderEmailCode({
		order_number: req.body.order_number,
		email: req.user.email,
		username: req.user.username

	});
	sendOrderConfirmation(codeData)

}

// Get an order
exports.read = (req, res) => {
	res.json(req.order);
}

// Update an order
exports.update = (req, res) => {
	
	var order = req.order;

	order.user_id = req.body.user_id;
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
