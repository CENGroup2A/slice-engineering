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
        }
        else {
            res.json({success:true, data:{data}});
            //res.json(data);
            return data;
        }
    });
};

exports.get_s3 = (req, res) => {
    var params = {
        Bucket: BUCKET_NAME
    };

    s3.listObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
        {  
            for(var file in data.Contents)
            {
                varFileParams = {
                    Bucket: BUCKET_NAME,
                    Key: data.Contents[file].Key,
                    Expires: 60 //Set expiration time that i.materialise could use this link
                }
                //console.log(data.Contents);
                //console.log(data.Contents[file].Key)
                var url = s3.getSignedUrl('getObject', varFileParams);
                console.log('URL: ', url);
            }
        }
      });
    
    res.json({success:true})
};
