const server = require('../controllers/S3Upload.server.controller.js'),
    express = require('express'),
    router = express.Router()

router.route('/upload')
  .post(server.sign_s3);

router.route('/getS3')
  .post(server.get_s3);

module.exports = router;
