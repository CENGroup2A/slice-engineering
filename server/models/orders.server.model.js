var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');

var orderSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		required: true
	},
	order_number: {
		type: Number,
		required: true,
		unique: true
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

	/*
	request.post('https://i.materialise.com/web-api/order?id=' + this.order_number, function(err, res, body) {

		if (err) {
			throw err
		}
		
		let statusCode = res.body.statusCode

		if (statusCode === 0) {
			this.status = 'Cancelled'
		}
		else if (statusCode === 2) {
			this.status = 'Ordered'
		}
		else if (statusCode === 3) {
			this.status = 'Processing'
		}
		else if (statusCode === 4) {
			this.status = 'In Production'
		}
		else if (statusCode === 5) {
			this.status = 'Ready To Ship'
		}
		else if (statusCode === 6) {
			this.status = 'Shipped'
		}
		else if (statusCode === 7) {
			this.status = 'Delivered'
		}

		next()

	})
	*/

	next()

})

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;