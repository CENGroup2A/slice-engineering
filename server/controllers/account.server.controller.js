const User = require('../models/user.server.model')
      EmailCode = require('../models/emailcode.server.model'),
      sgMail = require('@sendgrid/mail'),
      passport = require('passport')
      AWS = require('aws-sdk');


function goodRequest(res)
{
    return res.json({
        message: {"name": "success"},
        user: res.user
    })
}

function errorRequest(res, type, message)
{
    return res.json({"message": {"name": type, "message": message}})
}

function sendVerificationEmail(codeData)
{
    sgMail.setApiKey(process.env.SEND_GRID_API || require('../config/config').sendGrid.APIKey);
    const msg = {
        to: codeData.email,
        from: 'noreply@slice-engineering.com',
        subject: 'Welcome to Slice Engineering! Confirm your Email',
        text: 'Code: ' + codeData.code + "\nhttp://localhost:3000/verify-email?code=" + codeData.code + "&username=" + codeData.username
    };
    sgMail.send(msg);
}

function createUserFolder(username)
{
    const ID = process.env.S3_KEY_ID || require('../config/config').key.keyID;
    const SECRET = process.env.S3_SECRETE_KEY || require('../config/config').key.secretKey;
    const BUCKET_NAME = process.env.S3_BUCKET_NAME || require('../config/config').bucket.bucketName;

    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET,
        signatureVersion: 'v4'
    });

    var params = {
        Bucket: BUCKET_NAME, 
        Key: username + "/", 
        ACL: 'public-read',
        Body: 'body'
    };

    s3.upload(params, function (err, data) {
        if (err)
            console.log("Error creating the folder: ", err);
        else
            console.log("Successfully created a folder on S3");
    });
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

        createUserFolder(user.username)

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

exports.login = function(req, res, next)
{
    passport.authenticate('local', function(err, user, info)
    {
        if (err)
            return errorRequest(res, "InternalError", "Internal error")

        if (info)
        {
            if (info.name == "IncorrectUsernameError")
                return errorRequest(res, info.name, "Incorrect username.")
            else if (info.name == "IncorrectPasswordError")
                return errorRequest(res, info.name, "Incorrect password.")
            else
                return errorRequest(res, "Invalid", "Invalid response.")
        }

        req.login(user, (err) =>
        {
            //console.log(user.username)
            goodRequest(res)
        });
    })(req, res, next);

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
