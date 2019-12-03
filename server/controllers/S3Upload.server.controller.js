//const Example = require('../models/examples.server.model.js')
const AWS = require('aws-sdk');
const fs = require('fs');

const ID = process.env.S3_KEY_ID || require('../config/config').key.keyID;
const SECRET = process.env.S3_SECRETE_KEY || require('../config/config').key.secretKey;
const BUCKET_NAME = process.env.S3_BUCKET_NAME || require('../config/config').bucket.bucketName;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    signatureVersion: 'v4'
});

exports.sign_s3 = (req, res) => {
    const fileName = req.body.filename;
    const fileType = req.body.filetype;

    var params = {
        Bucket: BUCKET_NAME,
        Key: req.user.username + "/" + fileName,
        Expires: 6000,
        //ContentType: fileType
    };

    s3.getSignedUrl("putObject", params, function(err, data) {
        if (err) {
            console.log(err);
            return err;
        }
        else {
            console.log(data)
            res.json({success:true, data:{data}});
            //res.json(data);
            return data;
        }
    });
};

exports.getFileURL = (req, res) => {
    var params = {
        Bucket: BUCKET_NAME
    };

    s3.listObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
        {
            for(var file in data.Contents)
            {
                //console.log(data.Contents[file].Key)
                //console.log(req.body.key)
                if(req.body.key === data.Contents[file].Key) {
                    varFileParams = {
                        Bucket: BUCKET_NAME,
                        Key: data.Contents[file].Key,
                        Expires: 60000 //Set expiration time that i.materialise could use this link
                    }

                    var url = s3.getSignedUrl('getObject', varFileParams);
                    //console.log('URL: ', url);
                    res.json({success:true, 'url': url})
                }
            }
        }
    });
};
