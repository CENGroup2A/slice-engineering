var express = require('express');
    request = require('request');
    parseString = require('xml2js');
    router = express.Router();
    
request('https://i.materialise.com/web-api/materials?user=lysaght.m@ufl.edu', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    xml2js.parseStringPromise(body).then(function (result) {
      console.dir(result);
      console.log('Done');
    })
    .catch(function (err) {
      console.log("Failed");
    });

}})




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