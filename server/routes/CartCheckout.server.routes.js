const getCheckout= require("../controllers/CartCheckout.server.controller.js"),
express = require('express'), 
router = express.Router()


router.route('/checkout')
.get(getCheckout.sendCartCheckout)
.post(getCheckout.sendCartCheckout)


  
module.exports = router;