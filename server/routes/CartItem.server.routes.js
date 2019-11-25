const getCartIDs= require("../controllers/Cartitem.server.controller.js"),
express = require('express'), 
router = express.Router()


router.route('/getCartItem')
.get(getCartIDs.sendCartItem)
.post(getCartIDs.sendCartItem)


  
module.exports = router;