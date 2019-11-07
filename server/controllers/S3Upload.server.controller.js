//const Example = require('../models/examples.server.model.js')
const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('../config/config')

const ID = config.key.keyID;
const SECRET = config.key.secretKey;
const BUCKET_NAME = config.bucket.bucketName;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// Now lets export this function so we can call it from somewhere else
/*exports.sign_s3 = (req,res) => {
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            res.json({success: false, error: err})
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
        const returnData = {
            signedRequest: data,
            url: 'https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}'
        };

        // Send it all back
        res.json({success:true, data:{returnData}});
    });
}*/
exports.sign_s3 = (req, res) => {
    const fileName = req.body.filename;
    const fileType = req.body.filetype;
    var params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType
    };

    s3.getSignedUrl("putObject", params, function(err, data) {
        if (err) {
            console.log(err);
            return err;
        } else {
            const returnData = {
                signedRequest: data,
                url: 'https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}'
            };
            res.json({success:true, data:{data}});
            //res.json(data);
            return data;
        }
    });
};

exports.hello = function(req, res) {
    res.send('world')
};