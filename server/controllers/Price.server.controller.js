var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');


 var PRICE="";
 var mat;
 var finish;

//Upload model via URL
async function FetchmodelID(){
let data =await axios.post('https://imatsandbox.materialise.net/web-api/tool/2efbcc6f-fe98-406f-8cd1-92b133aae7c3/model', 
  {
    //LINKS TO TRY
    // https://static.free3d.com/models/1/ej0vwvf0j8jk-lowpolycat.rar     CAT
    //https://static.free3d.com/models/1/dxmuladgj3eo-3DBenchy.stl.zip    BOAT
    //https://slice-engineering-file-test-open.s3.us-east-2.amazonaws.com/3DBenchy.stl"  BOAT FROM OUR AWS
    fileUrl:"https://static.free3d.com/models/1/dxmuladgj3eo-3DBenchy.stl.zip",
    fileUnits:"mm",
    
      headers: {
        "accept": "application/json",
      }
      
  })
   console.log("ModelID",data.data.modelID);
   return(data.data.modelID)
}

  //get price
  async function fetchPrice(material,finish){
    let data = await axios.post('https://imatsandbox.materialise.net/web-api/pricing/model', 
    {
      models: [
        {
          "modelID": await FetchmodelID(),
          "materialID":material,
          "finishID":finish,
          "quantity":"1",
          "scale":"0.5"
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
      console.log("api request",data.data);
      console.log("Quote of Model Uploaded: $",data.data.models[0].totalPrice)
      PRICE=data.data.models[0].totalPrice;
      
    }
    
exports.sendMatFIN = (req, res)=>
{
  //req.body is the information after we hit "Submit" on the form
  mat = req.body.material
   finish = req.body.finish
   fetchPrice(mat,finish);
  
}
exports.getPrice= (req, res)=>
{
    res.json(PRICE)
    //Jason The Quote is now stored in http://localhost:5000/api/getPrice
    //so do your thing in frontend 
}
