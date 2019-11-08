const signup = require('../controllers/signup.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .post(signup.signup);
  
module.exports = router;