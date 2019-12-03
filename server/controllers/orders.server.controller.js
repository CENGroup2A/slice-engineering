var mongoose = require('mongoose'),
	Order = require('../models/orders.server.model');
	OrderEmailCode = require('../models/ordercode.server.model');
	
	
	
//sends a confirmation email after an order is placed
function sendOrderConfirmation(codeData)
{
	console.log("sending email");
	sgMail.setApiKey(process.env.SEND_GRID_API || require('../config/config').sendGrid.APIKey);
	const msg = {
		to: codeData.email,
		from: 'noreply@slice-engineering.com',
		subject: 'Slice Engineering CAD Upload Order Confirmation',
		text: "Hello, "
		+ codeData.username +
		"\n\nThis email is to confirm that you have succesfully placed an order for a CAD upload file\n" +
		"\nYour orderID is " + codeData.order_number
	};
	sgMail.send(msg);
}


//Sends an email to notify the user of a status update on their order
function sendOrderUpdate(codeData)
{
	
	sgMail.setApiKey(process.env.SEND_GRID_API || require('../config/config').sendGrid.APIKey);
	const msg = {
		to: codeData.email,
		from: 'noreply@slice-engineering.com',
		subject: 'Slice Engineering CAD Order Status Update',
		text: "Hello, "
		+ codeData.username +
		"\n\nYour order status is now \n\"" + codeData.status + "\"" +
		"\n\nYour orderID is " + codeData.order_number
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
	
	//Gets user based on userId and sends an email
		User.findById(order.user_id).then((currentUser) =>
		{
			if(currentUser)
			{
				var currUserName = currentUser.username;
				var userEmail = currentUser.email;

				sendOrderConfirmation(new OrderEmailCode({
					order_number: order.order_number,
					status: order.status,
					email: userEmail,// email based on userID user
					username: currUserName// username based on userID user
			
				}));
			}
			else
			{
				console.log("User not found");
			}
		});

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

	order.user_id = req.body.user_id;
	order.order_number = req.body.order_number;
	order.status = req.body.status;

	order.save(err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(order);
		

		//Gets user based on userId and sends an email
		User.findById(order.user_id).then((currentUser) =>
		{
			if(currentUser)
			{
				var currUserName = currentUser.username;
				var userEmail = currentUser.email;

				sendOrderUpdate(new OrderEmailCode({
					order_number: order.order_number,
					status: order.status,
					email: userEmail,// email based on userID user
					username: currUserName// username based on userID user
			
				}));
			}
			else
			{
				console.log("User not found");
			}
		});
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
