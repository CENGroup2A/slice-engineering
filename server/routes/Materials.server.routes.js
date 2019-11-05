
/* Dependencies */
var getMatrerials = require('../controllers/Materials.server.routes.js'), 
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 
  Note: the listings variable above and the file it is connected to help you trace
 */

router.route('/mat')
  .get(getMatrerials.MAT)
  .post(getMatrerials.MAT)
  

module.exports = router;