var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');
                  
//Setup your request using URL and options - see ? for format
axios.post('https://imatsandbox.materialise.net/web-api/pricing/model', 
{
  models: [
    {
      "modelID":"28ba016b-68a6-4511-a518-2cd4dafd43b7",
      "materialID":"035f4772-da8a-400b-8be4-2dd344b28ddb",
      "finishID":"bba2bebb-8895-4049-aeb0-ab651cee2597",
      "quantity":"1",
      "scale":"1.0"
    }
  ],
  shippingInfo: 
  {
    countryCode: "US",
    stateCode: "FL",
    city : "Gainesville",
    zipCode : "32603",
    
  },
  "currency": "USD"
  }, 
  {
    headers: {
      "accept": "application/json",
      "APICode": config.imaterialize.API
    }
  })
  .then((response) => console.log('response.data.models', response.data.models))
  .catch((error) => console.error(error))
  

//ALL I DID WAS SWT UP THE ROUTER /api/price 
exports.Price = (req, res)=>
{
  res.send("hello")
}