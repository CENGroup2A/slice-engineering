var express = require('express');
    request = require('request');
    router = express.Router();
    config = require('../config/config');
   
        module.exports = function(req, res, next) {
            if(req.body) {
               
                
              
              var options = { 
                Accept:        ["application/json"],
                API code:      [config.imaterialize.API],
                toolId: config.imaterialize.toolId,
                modelID:"0c3ff00c-3020-4677-9bcf-d451c637252c",
                materialID:"035f4772-da8a-400b-8be4-2dd344b28ddb",
                finishID:"bba2bebb-8895-4049-aeb0-ab651cee2597",
                quantity:"1",
                scale:"1.0"
                countryCode: "US",
                stateCode: "FL",
                city: "Gainesville",
                zipCode:  "32608"
                currency:"USD"
                 }
                                 

                
          
              //Setup your request using URL and options - see ? for format
              POST({
                url: 'https://imatsandbox.materialise.net/web-api/pricing', 
                qs: options
                }, function(error, response, body) {
                
                  if (error){
                    console.log(error);
                  }
                  else{
                  //JSON.parse to get contents. Remember to look at the response's JSON format in open cage data
                  var data = JSON.parse(body);
                  console.log(data);
                  /*Save the coordinates in req.results -> 
                  
              
                   //req.results =
                  }
                  next();
              });
            } else {
              next();
            }
          };  