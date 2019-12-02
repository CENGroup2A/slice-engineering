var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');


 var price ="";
 var mat;
 var finish;
 var countryCode;
 var stateCode;
 var city;
 var zipcode;
 var currency
 var scale
 var ourprice
 var url

  //Upload model via URL
  async function FetchmodelID(){
    var package = {
      //LINKS TO TRY
      // https://static.free3d.com/models/1/ej0vwvf0j8jk-lowpolycat.rar     CAT
      //https://static.free3d.com/models/1/dxmuladgj3eo-3DBenchy.stl.zip    BOAT
      //https://slice-engineering-file-test-open.s3.us-east-2.amazonaws.com/3DBenchy.stl"  BOAT FROM OUR AWS

      fileUrl: url,
      fileUnits:"mm"
    }
    console.log(package)
    let data = await axios.post(('https://imatsandbox.materialise.net/web-api/tool/2efbcc6f-fe98-406f-8cd1-92b133aae7c3/model'),
    package, {headers: {
      "accept": "application/json",
    }})

    console.log("ModelID",data.data.modelID);
    return(data.data.modelID)
  }

  //get price from API
  async function fetchPrice(material,finish,countryCode,stateCode){
    var package = {
      models: [
        {
          "modelID": await FetchmodelID(),
          "materialID":material,
          "finishID":finish,
          "quantity":"1",
          "scale":scale
        }
      ],
      shipmentInfo:
      {
        countryCode: countryCode,
        stateCode: stateCode,
        city : city,
        zipCode : zipcode,
      },
        "currency": currency
    }
    console.log(package)
    let data = await axios.post('https://imatsandbox.materialise.net/web-api/pricing/model',
    package,
    {
      headers: {
        "accept": "application/json",
        "APICode": config.imaterialize.API
      }
    })
    // console.log("api request",data.data);
    console.log("Quote of Model Uploaded: $",data.data.models[0].totalPrice)
    // console.log('data.data.models[0]', data.data.models[0])
    console.log('Shipping Info: ', data.data.shipmentCost)
    //Works
    price = data.data;
  }

//Receives the information from Material.js
exports.sendMatFIN = (req, res)=>
{
  //req.body is the information after we hit "Submit" on the form
  mat = req.body.material
  finish = req.body.finish
  countryCode = req.body.countryCode
  stateCode = req.body.stateCode
  city = req.body.city
  zipcode = req.body.zipcode
  currency = req.body.currency
  scale = req.body.scale
  url = req.body.url

  fetchPrice(mat,finish,countryCode,stateCode)
  .then(() =>
  {
    price.scale = scale
    res.json(price)
  })
  .catch((error) =>
    {
     console.error(error)
    })
}

//Sends the Price back to Material.js
exports.getPrice= (req, res)=>
{
  res.json(price)
}
