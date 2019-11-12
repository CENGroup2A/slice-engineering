var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');
    

/* var options = { 
  method: 'POST',
  headers:{
    Accept:"application/json",
    API code: config.imaterialize.API
  }
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
  } */
                  
//Setup your request using URL and options - see ? for format
axios.post('https://imatsandbox.materialise.net/web-api/pricing/model', {
  models: [
    {
      modelReference: "name",
      modelID: "bc72a29e-afa8-4ee6-9304-748621e66873",
      materialID:"035f4772-da8a-400b-8be4-2dd344b28ddb",
      finishID:"bba2bebb-8895-4049-aeb0-ab651cee2597",
      quantity:"1",
     /*  xDimMm: "10",
      yDimMm: "10",
      zDimMm: "10",
      volumeCm3: "1000",
      surfaceCm2: "100" */
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
  .then((response) => console.log(response.data.models))
  .catch((error) => console.error(error))
  




//ALL I DID WAS SWT UP THE ROUTER /api/price 
exports.Price = (req, res)=>
{
  res.send("hello")
}