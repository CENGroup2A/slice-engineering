const getCartIDs= require("../controllers/CartItem.server.controller.js"),
express = require('express'), 
router = express.Router()

router.route('/submit-cart')
    .post(getCartIDs.sendCartItem)

module.exports = router;
