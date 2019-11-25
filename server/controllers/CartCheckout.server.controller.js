var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartCheckout="";



  
  async function FetchCheckout(){
    let data =await axios.post('https://imatsandbox.materialise.net/web-api/order/post', 
    {
      "cartID":"9540dba3-6b13-4934-aceb-d74445ab8530",
      "myOrderReference":"",
      "directMailingAllowed":"false",
      "shipmentService":"",
      "myInvoiceLink":"http://mysite.com/invoice.pdf",
      "myDeliveryNoteLink":"http://mysite.com/deliverynote.pdf",
      "remarks":"",
      "languageCode":"en"
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

