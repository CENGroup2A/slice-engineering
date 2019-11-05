const fs = require('fs');
const AWS = require('aws-sdk');

const uploadFile = (fileName) => {
    // read the content from the file
    const fileContent = fs.readFileSync(fileName);

    // sets up the uplpoad parameters
    const params = {
        Bucket: 'slice-engineering-cad-models',      // bucket
        Key: fileName,            // file name, as it will appear on S3
        Body: fileContent         // cad file
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};
