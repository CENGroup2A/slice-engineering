var request = require('request');
request('https://i.materialise.com/web-api/materials?user=lysaght.m@ufl.edu', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) 
  }
})