const sendMAt = require("../controllers/Cartitem.server.controller.js"),
getCartID = require("../controllers/Cartitem.server.controller.js"),

    express = require('express'), 
    router = express.Router()


router.route('/getCartID')
.get(getCartID.sendCartID)



  
module.exports = router;