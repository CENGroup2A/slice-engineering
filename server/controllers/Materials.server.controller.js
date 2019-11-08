var express = require('express');
    request = require('request');
    router = express.Router();

request('https://i.materialise.com/web-api/materials?user=lysaght.m@ufl.edu', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.dirxml(body); // Print the google web page.
  }else{console.log(error)}
});

//  request({
//     url: 'https://i.materialise.com/web-api/materials?user=lysaght.m@ufl.edu', 
    
//     }, function(error, response, body) {
    
//       if (error){
//         console.log(error);
//       }
//       else{
      
//       var data = response;
//       console.log(data);
//       }
//       next();
//   });



// exports.MAT = function(req, res) {
//     res.send(req)
//     console(req)
// };
// module.exports = router;