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
	file: {
		type: String,
		unique: true
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

	/* TODO: add API key for iMaterialise to request */
	request.post('https://i.materialise.com/web-api/order?id=' + this.order_number, function(err, res, body) {

		if (err) {
			throw err
		}

		if (res.body.orders) {
			this.status = res.body.orders[0].statusName
		}

	})

	next()

})

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;