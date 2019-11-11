var should = require('should'),
	request = require('supertest'),
	express = require('../config/express'),
	Order = require('../models/orders.server.model');

var app, agent, order, id;
var order2, id2;

describe('Orders CRUD tests', () => {

	this.timeout(10000);

	before(done => {
		app = express.init();
		agent = request.agent(app);
		done();
	});

})