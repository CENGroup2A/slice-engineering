var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	user_id: {
		type: String,
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
			'Quote accepted',
			'Order in progress',
			'Order complete',
			'Order has shipped',
			'Order delivered'
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

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;