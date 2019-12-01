var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartItem
var cartCheckout
var cartId
var FormData = require('form-data');

function FetchCartItem()
{
  var example = {
    "cartItems":[
       {
          "toolID":"2efbcc6f-fe98-406f-8cd1-92b133aae7c3",
          "MyCartItemReference":"some reference",
          "modelID":"8a07f8c7-eda7-4a15-a843-f7661491c2d8",
          "modelFileName":"",
          "fileUnits":"mm",
          "fileScaleFactor":"1",
          "materialID":"035f4772-da8a-400b-8be4-2dd344b28ddb",
          "finishID":"bba2bebb-8895-4049-aeb0-ab651cee2597",
          "quantity":"1",
          "xDimMm":"12",
          "yDimMm":"12",
          "zDimMm":"12",
          "volumeCm3":"2.0",
          "surfaceCm2":"100.0",
          "iMatAPIPrice": "25.0",
          "mySalesPrice": "26.0",
       }
    ],
    "currency":"USD"
}
 var form = new FormData()
 form.append("data", JSON.stringify(example), {filename:"blob", contentType: 'application/json'})
 console.log(form)

  return axios.post('https://imatsandbox.materialise.net/web-api/cartitems/register', 
  form,
  {
    headers: form.getHeaders()
  })
  .then((data) =>
  {
    console.log("data.data",data.data);
    cartItem=data.data;
    return Promise.resolve(data.data.modelID)
  })
  .catch((error) =>
  {
    console.error(error)
  })
}

async function FetchCartID(){
  let data =await axios.post('https://imatsandbox.materialise.net/web-api/cart/post', 
  {
    MyCartReference: "My cart",
    Currency: "USD",
    LanguageCode: "en",
    ReturnUrl: "http://mysite.com/success.html",
    OrderConfirmationUrl: "http://mysite.com/confirm.html",
    FailureUrl: "http://mysite.com/failure.html",
    PromoCode:"", 
    CartItems:[
       { 
          CartItemID: "3f32b116-805f-495c-9497-d70a77b68179"
       }],
    ShippingInfo: {
      FirstName: "John",
      LastName: "Smith",
      Email: "demo@demo.com",
      Phone: "1234567",
      Company: "No company",
      Line1: "North Street",
      Line2:"",
      CountryCode: "US",
      StateCode:"FL",
      ZipCode: "32608",
      City: "Gainesville"
    },
    BillingInfo: {
      FirstName: "John",
      LastName: "Smith",
      Email: "demo@demo.com",
      Phone: "1234567",
      Company: "No company",
      Line1: "North Street",
      Line2:"",
      CountryCode: "US",
      StateCode:"FL",
      ZipCode: "32608",
      City: "Gainesville",
      VatNumber: "BE0999999922"
    }
  }, 
  {
    headers: {
      "accept": "application/json",
    }
  })
  console.log("data.data",data);
  cartID=data.data;
  return(data.data.modelID)
}

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

exports.sendCartItem = (req, res)=>
{
  FetchCartItem()
  .then(() =>
  {
    FetchCartID()
    .then(() =>
    {
      FetchCheckout()
      .then(() =>
      {
        res.json(cartCheckout)
      })
    })
  })
}

