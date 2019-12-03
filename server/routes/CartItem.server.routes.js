const getCartIDs= require("../controllers/Cartitem.server.controller.js"),
express = require('express'), 
router = express.Router()


router.route('/getCartItem')
.get(getCartIDs.sendCartItem)
.post(getCartIDs.sendCartItem)

router.route('/sendCartData')
.get(getCartIDs.getDataFromCart)
.post(getCartIDs.getDataFromCart)
  
module.exports = router;