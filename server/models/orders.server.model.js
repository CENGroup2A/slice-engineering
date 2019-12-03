var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');

var orderSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	order_number: {
		type: String
	},
	status: {
		type: String,
		required: true,
		enum: [
			'Cancelled',
			'Ordered',
			'Processing',
			'In Production',
			'Ready To Ship',
			'Shipped',
			'Delivered'
		]
	},
	file_name: {
		type: String,
		unique: true,
		required: true
	},
	created_at: Date,
	updated_at: Date
});

orderSchema.pre('save', function(next) {

	var currentDate = new Date();
	this.updated_at = currentDate;

	if (!this.created_at) {
		this.created_at = currentDate;
	}

	next();

});

orderSchema.pre('find', function(next) {

	// TODO: sandbox API for now
	request({
		headers: {
			'Content-Type': 'multipart/form-data',
			'APICode': process.envimaterialize_API || require('../config/config').imaterialize.API
		},
		uri: 'https://imatsandbox.materialise.net/web-api/order?number=' + this.order_number,
		method: 'POST'
	}, function(err, res, body) {

		if (err) {
			console.error(err)
			return
		}

		if (res.body.orders) {
			this.status = res.body.orders[0].statusName
		}

	})

	next()

})

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;