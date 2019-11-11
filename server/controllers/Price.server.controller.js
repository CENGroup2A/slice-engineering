var express = require('express');
 const   https = require('https');
 router = express.Router();
 config = require('../config/config');
    

// var options = { 
//   method: 'POST',
//   headers:{
//     Accept:"application/json",
//     API code: config.imaterialize.API
//   }
//   toolId: config.imaterialize.toolId,
//   modelID:"0c3ff00c-3020-4677-9bcf-d451c637252c",
//   materialID:"035f4772-da8a-400b-8be4-2dd344b28ddb",
//   finishID:"bba2bebb-8895-4049-aeb0-ab651cee2597",
//   quantity:"1",
//   scale:"1.0"
//   countryCode: "US",
//   stateCode: "FL",
//   city: "Gainesville",
//   zipCode:  "32608"
//   currency:"USD"
//   }
                  
//Setup your request using URL and options - see ? for format
https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  console.log(res);
  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
//ALL I DID WAS SWT UP THE ROUTER /api/price 
exports.Price = (req, res)=>
{
  res.json({"menu": {
    "id": "file",
    "value": "File",
    "popup": {
      "menuitem": [
        {"value": "New", "onclick": "CreateNewDoc()"},
        {"value": "Open", "onclick": "OpenDoc()"},
        {"value": "Close", "onclick": "CloseDoc()"}
      ]
    }
  }})
}