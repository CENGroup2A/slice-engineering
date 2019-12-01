var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartCheckout="";

  // async function FetchCheckout(){
  //   let data = await axios.post('https://imatsandbox.materialise.net/web-api/order/post', 
  //   {
  //     cartID:"ec2425f8-7e23-4b96-8df8-b99e85b9caa7",
  //     myOrderReference:"test",
  //     shipmentService:"SecondDayAir"
  //   },
  //   {
  //     headers: {
  //       "APICode": config.imaterialize.API,
  //       "accept": "application/json",
  //     }
  //   })
  //   console.log("data.data",data.data);
  //   cartCheckout=data.data;
  //   return(data.data.modelID)
  // }

  var FormData = require('form-data');

function FetchCheckout()
{
  var example = {
    cartID:"ec2425f8-7e23-4b96-8df8-b99e85b9caa7",
    myOrderReference:"test",
    shipmentService:"Express"
  }
  
 var form = new FormData()
 form.append("data", JSON.stringify(example), {filename:"blob", contentType: 'application/json'})
 //, headers: {"APICode": config.imaterialize.API}
 console.log(form.getHeaders())

  return axios.post('https://imatsandbox.materialise.net/web-api/order/post', 
  form,
  {
    headers: {...form.getHeaders(), "APICode": config.imaterialize.API}
  })
  .then((data) =>
  {
    console.log("data.data",data.data);
    cartCheckout=data.data;
    return Promise.resolve(data.data.modelID)
  })
  .catch((error) =>
  {
    console.error(error)
  })
}

exports.sendCartCheckout = (req, res)=>
{
  FetchCheckout()
  .then(() =>
  {
    res.json(cartCheckout)
  })
}