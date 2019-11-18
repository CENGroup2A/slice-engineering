const getPrice = require("../controllers/Price.server.controller.js"),
    express = require('express'), 
    router = express.Router()

router.route('/price')
  .get(getPrice.Price)
  .post(getPrice.Price)
  
module.exports = router;