const sendMAt = require("../controllers/Price.server.controller.js"),
      getPrice = require("../controllers/Price.server.controller.js"),

    express = require('express'), 
    router = express.Router()

router.route('/sendMat')
  .get(sendMAt.sendMatFIN)
  .post(sendMAt.sendMatFIN)
  

router.route('/getPrice')
.get(getPrice.getPrice)
// .post(getPrice.getPrice)


  
module.exports = router;