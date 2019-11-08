const login = require('../controllers/login.server.controller.js'),
    express = require('express'), 
    router = express.Router()

router.route('/')
  .post(login.login);
  
module.exports = router;