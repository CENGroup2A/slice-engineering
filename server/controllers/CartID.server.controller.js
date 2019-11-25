var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartID="";



  
  async function FetchCartID(){
    let data =await axios.post('https://imatsandbox.materialise.net/web-api/cart/post', 
    {
      "MyCartReference": "My cart",
      "Currency": "USD",
      "LanguageCode": "en",
      "ReturnUrl": "http://mysite.com/success.html",
      "OrderConfirmationUrl": "http://mysite.com/confirm.html",
      "FailureUrl": "http://mysite.com/failure.html",
      "PromoCode":"", 
      "CartItems":[
         { 
            "CartItemID": "69db9169-516d-4248-8a0f-115c82be1e91"
         }],
      "ShippingInfo": {
        "FirstName": "John",
        "LastName": "Smith",
        "Email": "demo@demo.com",
        "Phone": "1234567",
        "Company": "No company",
        "Line1": "North Street",
        "Line2":"",
        "CountryCode": "US",
        "StateCode":"NY",
        "ZipCode": "10001",
        "City": "New York"
      },
      "BillingInfo": {
        "FirstName": "John",
        "LastName": "Smith",
        "Email": "demo@demo.com",
        "Phone": "1234567",
        "Company": "No company",
        "Line1": "North Street",
        "Line2":"",
        "CountryCode": "BE",
        "StateCode":"",
        "ZipCode": "1020",
        "City": "Brussels",
        "VatNumber": "BE0999999922"
      }
  })
    console.log("data.data",data);
    cartID=data.data;
    return(data.data.modelID)
  }





exports.sendCartID = (req, res)=>
{
  FetchCartID()
  .then(() =>
  {
    res.json(cartID)
  })
}
