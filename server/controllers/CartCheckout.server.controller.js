var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartCheckout="";



  
  async function FetchCheckout(){
    let data =await axios.post('https://imatsandbox.materialise.net/web-api/order/post', 
    {
      cartID:"0d705b9d-8376-4a26-8194-eb59e9e0b6dc",
      myOrderReference:"dsd",
      directMailingAllowed:"false",
      shipmentService:"",
      myInvoiceLink:"",
      myDeliveryNoteLink:"",
      remarks:"",
      languageCode:"en"
   },
   {
    headers: {
      "accept": "application/json",
      "APICode": config.imaterialize.API
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

