const Customer = require('../models/customer.server.model.js')
const bcrypt = require('bcrypt');



exports.signup = function(req, res)
{
    bcrypt.hash(req.body.password, 3, function(err, hash)
    {
        let customer = new Customer({
            name: req.body.name,
            username: req.body.username,
            passwordHash: hash
        })
        customer.save()
    });

    res.end()
};