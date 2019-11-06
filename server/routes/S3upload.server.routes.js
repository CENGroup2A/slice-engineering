const server = require('../controllers/S3Upload.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .get(server.hello);

router.route('/')
  .post(server.sign_s3);
  
module.exports = router;