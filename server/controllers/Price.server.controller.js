var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

                  


//Upload model via URL
async function FetchmodelID(){
let data =await axios.post('https://imatsandbox.materialise.net/web-api/tool/2efbcc6f-fe98-406f-8cd1-92b133aae7c3/model', 
  {
    // Request should consist of two parts:
    // • File (Content-Disposition: form-data; name=“file”; filename=“12.csv” Content-Type: application/octet-stream)
    // • File units (Content-Disposition: form-data; name=“fileUnits”) 


    // File: [
    //   {
    //     name:"file",
    //     filename: file.name,
    //     Content-Type: "application/octet-stream"
    //   } 
    // ],

    //LINKS TO TRY
    // https://static.free3d.com/models/1/ej0vwvf0j8jk-lowpolycat.rar     CAT
    //https://static.free3d.com/models/1/dxmuladgj3eo-3DBenchy.stl.zip    BOAT
    fileUrl:"https://static.free3d.com/models/1/ej0vwvf0j8jk-lowpolycat.rar",
    fileUnits:"mm",
    
      headers: {
        "accept": "application/json",
      }
      
  })
   console.log("ModelID",data.data.modelID);
   return(data.data.modelID)
}
    //console.log("md",MODELID)


    //get price
async function fetchPrice(){
  let data = await axios.post('https://imatsandbox.materialise.net/web-api/pricing/model', 
  {
    models: [
      {
        "modelID": await FetchmodelID(),
        "materialID":"035f4772-da8a-400b-8be4-2dd344b28ddb",
        "finishID":"bba2bebb-8895-4049-aeb0-ab651cee2597",
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
    }
    
    fetchPrice();
exports.Price = (req, res)=>
{
  //req.body is the information after we hit "Submit" on the form
  var mat = req.body.material
  var finish = req.body.finish
  var file = req.body.uploadedFile

  //axios.post("url", {mat, ....})
  console.log(req.body)
  console.log('mat:', mat)
  console.log('finish:', finish)
  console.log('file:', file)

  
  
  res.send('data')
}