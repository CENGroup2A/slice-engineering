var mongoose = require('mongoose'),
	Order = require('../models/orders.server.model');
	OrderEmailCode = require('../models/ordercode.server.model');
	
	
	
//sends a confirmation email after an order is placed
function sendOrderConfirmation(codeData)
{
	console.log("sending email to " + codeData.email);
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
exports.create = (username, order_number, status, file_name) => {

	var order = new Order({
		username: username,
		order_number: order_number,
		status: status,
		file_name: file_name
	});

	order.save(err => {
		if (err) {
			console.error(err);
		}
	})

	//Gets user based on userId and sends an email
	User.findOne({username: username}).then((currentUser) =>
	{
		if(currentUser)
		{
			sendOrderUpdate(new OrderEmailCode({
				order_number: order_number,
				status: status,
				email: currentUser.email,// email based on userID user
				username: username// username based on userID user
			}));
		}
		else
		{
			console.log("User not found");
		}
	});
}

exports.update = (order, username, order_number, status, file_name) => {

	order.username = username;
	order.order_number = order_number;
	order.status = status;
	order.file_name = file_name;

	order.save(err => {
		if (err) {
			console.error(err);
		}
	})
    
	//Gets user based on userId and sends an email
    //User.findById(order.user_id).then((currentUser) =>
	User.findOne({username: username}).then((currentUser) =>
	{
		if(currentUser)
		{
			sendOrderUpdate(new OrderEmailCode({
				order_number: order_number,
				status: status,
				email: currentUser.email,// email based on userID user
				username: currentUser.username// username based on userID user
			}));
		}
		else
		{
			console.log("User not found");
		}
	});

}

exports.delete = (order_number) => {

	Order.findOneAndDelete({ order_number: order_number }, err => {
		if (err) {
			console.error(err)
		}
	})

}

exports.list = () => {

	Order.find().exec((err, orders) => {
		if (err) {
			console.error(err)
		}
		else {
			return orders
		}
	})

}

exports.get = (req, res) => {

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

//Pass the file name into function and update the order_number with the imaterialise order ID
exports.updateOrderID = (fileName, orderID) => {
    Order.findOne({file_name: fileName}).then((order) => {
        order.order_number = orderID
	});
}
