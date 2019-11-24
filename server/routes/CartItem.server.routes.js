const getCartIDs= require("../controllers/Cartitem.server.controller.js"),
express = require('express'), 
router = express.Router()


router.route('/getCartID')
.get(getCartIDs.sendCartID)
.post(getCartIDs.sendCartID)


  
module.exports = router;