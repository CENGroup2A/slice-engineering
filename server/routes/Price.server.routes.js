const priceCont = require("../controllers/Price.server.controller.js"),
  express = require('express'), 
  router = express.Router()

router.route('/sendMat')
  .post(priceCont.sendMatFIN)

router.route('/getShipping')
  .post(priceCont.getShipping)

module.exports = router;