var should = require('should'),
	request = require('supertest'),
	express = require('../config/express'),
	Order = require('../models/orders.server.model');

var agent, id;

describe('Orders CRUD tests', function() {

	this.timeout(10000);

	before(done => {
		var app = express.init();
		agent = request.agent(app);
		done();
	});

	it('Should be able to save an order', done => {
		var order = {
			order_number: 1234,
			status: 'Processing'
		};
		agent.post('/api/orders')
			.send(order)
			.expect(200)
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res.body._id);
				res.body.order_number.should.equal(1234);
				res.body.status.should.equal('Processing');
				id = res.body._id;
				done();
			});
	});

	it('Should be able to retrieve all orders', done => {
		agent.get('/api/orders')
			.expect(200)
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res);
				// TODO: verify correct response body
				done();
			});
	});

	it('Should be able to retrieve a single order', done => {
		agent.get('/api/orders/' + id)
			.expect(200)
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res);
				res.body.order_number.should.equal(1234);
				res.body.status.should.equal('Processing');
				res.body._id.should.equal(id);
				done();
			});
	});

	it('Should be able to update an order', done => {
		var updatedOrder = {
			order_number: 1234,
			status: 'In Progress'
		};

		agent.put('/api/orders/' + id)
			.send(updatedOrder)
			.expect(200)
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res.body._id);
				res.body.order_number.should.equal(1234);
				res.body.status.should.equal('In Progress');
				done();
			});
	});

	it('Should be able to delete an order', done => {
		agent.delete('/api/orders/' + id)
			.expect(200)
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res);

				agent.get('/api/orders/' + id)
					.expect(500)
					.end((err, res) => {
						id = undefined;
						done();
					});
			});
	});

});