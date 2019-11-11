const Customer = require('../models/customer.server.model.js')
const bcrypt = require('bcrypt');
const passport = require('passport')
const User = require('../models/user.server.model')

function goodRequest(res)
{
    return res.json({message: "success"})
}

exports.signup = function(req, res)
{
    User.register(new User({username: req.body.username, email: req.body.email}), req.body.password)
    .then(function(user)
    {
        goodRequest(res)
    })
    .catch((err) => {
        console.log('error while user register!', err);
        res.json({message: err})
        return Promise.reject(err);
    });
};

exports.login = function(req, res)
{
    goodRequest(res)
};

exports.logout = (req, res) =>
{
    req.logout()
    goodRequest(res)
}

exports.auth = (req, res) =>
{
    res.json({"auth": true})
}