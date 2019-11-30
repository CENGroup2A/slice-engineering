//const Example = require('../models/examples.server.model.js')
const AWS = require('aws-sdk');
const fs = require('fs');

const ID = process.env.S3_KEY_ID || require('../config/config').key.keyID;
const SECRET = process.env.S3_SECRETE_KEY || require('../config/config').key.secretKey;
const BUCKET_NAME = process.env.S3_BUCKET_NAME || require('../config/config').bucket.bucketName;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

exports.sign_s3 = (req, res) => {
    const fileName = req.body.filename;
    const fileType = req.body.filetype;

    var params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType
    };
    console.log("Hello")
    s3.getSignedUrl("putObject", params, function(err, data) {
        if (err) {
            console.log(err);
            return err;
        }
        else {
            res.json({success:true, data:{data}});
            //res.json(data);
            return data;
        }
    });
};

exports.hello = function(req, res) {
    res.send('world')
};
