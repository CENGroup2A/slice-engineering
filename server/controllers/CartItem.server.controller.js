var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartItem
var cartCheckout
var cartId
var FormData = require('form-data');

//Price Variables
var modelID = "a2cb5121-72cc-41e1-89e5-ca76e1999bfb"
var materialID = "035f4772-da8a-400b-8be4-2dd344b28ddb"
var materialName = "Polyamide (SLS)"
var finishID =  "bba2bebb-8895-4049-aeb0-ab651cee2597"
var finishingName = "Natural white"
var materialPrice = "14.19"
var scale = "1"
var quantity = "1"
var surfaceCm2 = "94.3109"
var volumeCm3 = "15.5505"
var xDimMm = "60.001"
var yDimMm = "31.004"
var zDimMm = "48"
var shippingPrice = "15.50"
var shippingType = "Express"
var daysInTransit = "2"

function FetchCartItem()
{
  var example = {
    "cartItems":[
       {
          "toolID":config.imaterialize.toolId,
          "MyCartItemReference":"current cart item",
          "modelID":modelID,
          "fileScaleFactor":scale,
          "materialID":materialID,
          "finishID":finishID,
          "quantity":quantity,
          "xDimMm":xDimMm,
          "yDimMm":yDimMm,
          "zDimMm":zDimMm,
          "volumeCm3":volumeCm3,
          "surfaceCm2":surfaceCm2,
          "iMatAPIPrice": materialPrice,
          "mySalesPrice": materialPrice,
       }
    ],
    "currency":"USD"
}
 var form = new FormData()
 form.append("data", JSON.stringify(example), {filename:"blob", contentType: 'application/json'})

  return axios.post('https://imatsandbox.materialise.net/web-api/cartitems/register', 
  form,
  {
    headers: form.getHeaders()
  })
  .then((data) =>
  {
    console.log("data.data in FetchCartItem",data.data);
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
  console.log("data.data in FetchCartID",data);
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
    console.log("data.data in FetchCheckout",data.data);
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
    res.json(cartItem)
    // FetchCartID()
    // .then(() =>
    // {
    //   FetchCheckout()
    //   .then(() =>
    //   {
    //     res.json(cartCheckout)
    //   })
    // })
  })
}

exports.getDataFromCart = (req, res) =>
{
  modelID = req.body.modelID
  materialID = req.body.materialID
  materialName = req.body.materialName
  finishID = req.body.finishID
  finishingName = req.body.finishingName
  materialPrice = req.body.totalPrice
  scale = req.body.scale
  shippingPrice = req.body.shippingPrice
  shippingType = req.body.shippingType
  daysInTransit = req.body.daysInTransit

  console.log(modelID,materialID,materialName, finishID, finishingName, materialPrice, scale, shippingPrice, shippingType, daysInTransit)
}