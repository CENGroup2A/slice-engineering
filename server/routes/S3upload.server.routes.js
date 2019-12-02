const server = require('../controllers/S3Upload.server.controller.js'),
    express = require('express'),
    router = express.Router()

router.route('/upload')
  .post(server.sign_s3);

router.route('/getFileURL')
  .post(server.getFileURL);

module.exports = router;
