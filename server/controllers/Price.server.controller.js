var express = require('express');
    request = require('request');
    router = express.Router();
    config = require('../config/config');

var options = { 
    toolId: config.imaterialize.toolId,
    API: config.imaterialize.API,  
    }

 
 
  request('https://imatsandbox.materialise.net/web-api/pricing',(error, response, body) =>{
    {
        "models":[
           {
              "modelID":"0c3ff00c-3020-4677-9bcf-d451c637252c",
              "materialID":"035f4772-da8a-400b-8be4-2dd344b28ddb",
              "finishID":"bba2bebb-8895-4049-aeb0-ab651cee2597",
              "quantity":"1",
              "scale":"1.0"
           }
        ],
        "shipmentInfo": 
         {
             "countryCode": "US",
             "stateCode": "FL",
             "city": "Gainesville",
             "zipCode":  "32608"
         },
         "currency":"USD"
     }
                     
})
exports.material = (req, res)=>{
  res.listOfMats
}
