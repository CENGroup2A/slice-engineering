const User = require('../models/user.server.model')
const EmailCode = require('../models/emailcode.server.model')


function goodRequest(res)
{
    return res.json({message: {"name": "success"}})
}

function errorRequest(res, type, message)
{
    return res.json({"message": {"name": type, "message": message}})
}

exports.signup = function(req, res)
{
    User.register(new User({username: req.body.username, email: req.body.email, emailVerified : false}), req.body.password)
    .then((user) =>
    {
        var randomatic = require('randomatic')
        var codeData = {
            "username": user.username,
            "email": user.email,
            "code" : randomatic('Aa0', 10)
        }

        var code = new EmailCode(codeData)
        return code.save()
    })
    .then(() =>
    {
        goodRequest(res)
    })
    .catch((err) => {
        console.log('error while user register!', err);
        res.json({message: err})
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


//Handles verifying email address
// Errors:
// "MissingCode" - Indicatation that the requested code does not exist

exports.verifyEmail = (req, res) =>
{
    EmailCode.findOne({code: req.query.code})
    .then((code) =>
    {
        if (code == null)
            return errorRequest(res, "MissingCode", "The requested code does not exist.")
        
        User.findOne({username: code.username})
        .then((user) =>
        {
            if (user == null)
                return errorRequest(res, "MissingUser", "The user attached to the code no longer exists.")
            
            return User.update({"username": user.username},
            {
                "email": code.email,
                "emailVerified" : true
            })
        })
        .then(() =>
        {
            return code.remove()
        })
        .then(() =>
        {
            return goodRequest(res)
        })
        
    })
}