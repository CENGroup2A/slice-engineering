const priceCont = require("../controllers/Price.server.controller.js"),
  express = require('express'), 
  router = express.Router()

router.route('/sendMat')
  .get(priceCont.sendMatFIN)
  .post(priceCont.sendMatFIN)
  

router.route('/getPrice')
  .get(priceCont.getPrice)
// .post(priceCont.getPrice)

router.route('/cartData')
  .get(priceCont.cartData)
  .post(priceCont.cartData)

module.exports = router;