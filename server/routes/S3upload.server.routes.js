const server = require('../controllers/S3Upload.server.controller.js'),
    express = require('express'),
    router = express.Router(),
    isAuth = require('../middleware/isAuth')

router.route('/upload')
  .post(isAuth, server.sign_s3);

router.route('/getFileURL')
  .post(isAuth, server.getFileURL);

module.exports = router;
