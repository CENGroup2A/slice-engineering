var request = require('request');


 request({
    url: 'https://i.materialise.com/web-api/materials?user=lysaght.m@ufl.edu', 
    
    }, function(error, response, body) {
    
      if (error){
        console.log(error);
      }
      else{
      
      var data = body;
      req.results=data.results[0].geometry;
      console.log(data);
      }
      next();
  });



exports.MAT = function(req, res) {
    res.send(req.results)
};
module.exports = router;