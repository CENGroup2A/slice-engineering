const User = require('../models/user.server.model')
const EmailCode = require('../models/emailcode.server.model')
const PasswordCode = require('../models/passwordcode.server.model')
const config = require('../config/config')
const sgMail = require('@sendgrid/mail');

function goodRequest(res)
{
    return res.json({message: {"name": "success"}})
}

function errorRequest(res, type, message)
{
    return res.json({"message": {"name": type, "message": message}})
}

function sendVerificationEmail(codeData)
{
    sgMail.setApiKey(config.sendGrid.APIKey);
    const msg = {
        to: codeData.email,
        from: 'noreply@slice-engineering.com',
        subject: 'Welcome to Slice Engineering! Confirm your Email',
        text: "http://localhost:3000/verify-email?code=" + codeData.code + "&username=" + codeData.username
    };
    sgMail.send(msg);
}

function sendResetPasswordEmail(codeData)
{
    sgMail.setApiKey(config.sendGrid.APIKey);
    const msg = {
        to: codeData.email,
        from: 'noreply@slice-engineering.com',
        subject: 'Reset Your Password',
        text: "http://localhost:3000/reset-password?code=" + codeData.code + "&username=" + codeData.username
    };
    sgMail.send(msg);
}

async function updatePassword(user, password)
{
    await user.setPassword(password);
    await user.save();
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

        sendVerificationEmail(codeData)

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
}

exports.logout = (req, res) =>
{
    req.logout()
    goodRequest(res)
}

exports.requestPasswordChange = (req, res) =>
{
    //Expecting request that contains username and email
    var randomatic = require('randomatic')
    var codeData = {
        "username": req.body.username,
        "email": req.body.email,
        "code" : randomatic('Aa0', 10),
    }

    User.findOne({username: code.username, email: code.email})
    .then((user) =>
    {
        //Check if user exists
        if (user == null)
                return errorRequest(res, "MissingUser", "No such user exists.")
        
        //Check if user's email is verified
        if(user.emailVerified)
        {
            var code = new PasswordCode(codeData)
            code.save() //Save reset password information into database
            sendResetPasswordEmail(codeData) //Send reset password email to customer
    
            goodRequest(res)
        }
        else
        {
            return errorRequest(res, "UnverifiedEmail", "User email is not verified.")
        }
    })

}

exports.changePassword = (req, res) =>
{
    //Expecting request that contains code, username, and new password
    PasswordCode.findOne({code: req.body.code, username: req.body.username})
    .then((code) =>
    {
        if (code == null)
            return errorRequest(res, "MissingCode", "The requested code does not exist for this user.")
        
        User.findOne({username: code.username})
        .then((user) =>
        {
            if (user == null)
                return errorRequest(res, "MissingUser", "The user attached to the code no longer exists.")
            
            updatePassword(user, req.body.password)
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

exports.auth = (req, res) =>
{
    res.json({"auth": true})
}


//Handles verifying email address
// Errors:
// "MissingCode" - Indicatation that the requested code does not exist

exports.verifyEmail = (req, res) =>
{
    EmailCode.findOne({code: req.body.code, username: req.body.username})
    .then((code) =>
    {
        if (code == null)
            return errorRequest(res, "MissingCode", "The requested code does not exist for this user.")
        
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
