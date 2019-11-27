
/* Dependencies */
const getMaterials = require('../controllers/Materials.server.controller.js'), 
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 
  
 */

router.route('/mat')
  .get(getMaterials.material);
 // .post(getMatrerials.MAT)
  
  

module.exports = router;