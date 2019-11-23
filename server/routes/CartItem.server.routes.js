const sendMAt = require("../controllers/CartID.server.controller.js"),
getCartID = require("../controllers/CartID.server.controller.js"),

    express = require('express'), 
    router = express.Router()


router.route('/getCartID')
.get(getCartID.getPrice)
// .post(getPrice.getPrice)


  
module.exports = router;