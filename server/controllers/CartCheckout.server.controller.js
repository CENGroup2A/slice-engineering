var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartCheckout="";

  async function FetchCheckout(){
    let data = await axios.post('https://imatsandbox.materialise.net/web-api/order/post', 
    {
      cartID:"ec2425f8-7e23-4b96-8df8-b99e85b9caa7",
      myOrderReference:"test",
      shipmentService:"SecondDayAir"
    },
    {
      headers: {
        "APICode": config.imaterialize.API,
        "accept": "application/json",
      }
    })
    console.log("data.data",data.data);
    cartCheckout=data.data;
    return(data.data.modelID)
  }

exports.sendCartCheckout = (req, res)=>
{
  FetchCheckout()
  .then(() =>
  {
    res.json(cartCheckout)
  })
}