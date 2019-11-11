var should = require('should'),
	mongoose = require('mongoose'),
	Order = require('../models/orders.server.model'),
	config = require('../config/config');

var id;
var order = {
	order_number: 1234,
	status: 'Processing'
};

describe('Order Schema Unit Tests', () => {

	before(done => {
		mongoose.connect(config.db.uri, { useNewUrlParser: true });
		mongoose.set('useCreateIndex', true);
		mongoose.set('useFindAndModify', false);
		done();
	});

	describe('Saving to database', () => {

		this.timeout(10000);
		
		it('Saves properly when order_number and status provided', done => {
			new Order({
				order_number: order.order_number,
				status: order.status
			}).save((err, order) {
				should.not.exist(err);
				id = order._id;
				done();
			});
		});

		it('Throws an error when order_number not provided', done => {
			new Order({
				status: order.status
			}).save(err => {
				should.exist(err);
				done();
			});
		});

		it('Throws an error when status not provided', done => {
			new Order({
				order_number: order.order_number
			}).save(err => {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(done => {
		if (id) {
			Order.deleteOne({ _id: id }).exec(() => {
				id = null;
				done();
			});
		} else {
			done();
		}
	});

});