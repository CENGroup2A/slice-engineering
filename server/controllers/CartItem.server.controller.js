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
var countryCode = ""
var stateCode = ""
var city = ""
var zipcode = ""
var currency = ""
var firstName = ""
var lastName = ""
var phoneNumber = ""
var email  = "" 

//Variables for FetchCartID
var cartItemID
var modelFileName

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
    "currency":currency
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
    console.log("data.data in FetchCartItem => cartItems[0]:", data.data.cartItems[0]);
    cartItem=data.data;
    cartItemID=data.data.cartItems[0].cartItemID
    return Promise.resolve(data.data)
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
    Currency: currency,
    LanguageCode: "en",
    ReturnUrl: "",
    OrderConfirmationUrl: "",
    FailureUrl: "",
    PromoCode:"", 
    CartItems:[
       { 
          CartItemID: cartItemID
       }],
    ShippingInfo: {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phoneNumber,
      Company: "No company",
      Line1: "North Street",
      Line2:"",
      CountryCode: countryCode,
      StateCode:stateCode,
      ZipCode: zipcode,
      City: city
    },
    BillingInfo: {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phoneNumber,
      Company: "No company",
      Line1: "North Street",
      Line2:"",
      CountryCode: countryCode,
      StateCode:stateCode,
      ZipCode: zipcode,
      City: city,
      VatNumber: ""
    }
  }, 
  {
    headers: {
      "accept": "application/json",
    }
  })
  console.log("data.data in FetchCartID",data.data);
  cartID=data.data;
  cartItemID=data.data.cartItems[0].cartItemID
  return(data.data.modelID)
}

function FetchCheckout()
{
  console.log('cartItemID', cartItemID)
  var example = {
    cartID: cartID,
    myOrderReference:"test",
    shipmentService:shippingType
  }
  
 var form = new FormData()
 form.append("data", JSON.stringify(example), {filename:"blob", contentType: 'application/json'})
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
    FetchCartID()
    .then(() =>
    {
      res.json(cartID)
      // FetchCheckout()
      // .then(() =>
      // {
      //   res.json(cartCheckout)
      // })
    })
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
  countryCode = req.body.countryCode
  stateCode = req.body.countryCode
  city = req.body.city
  zipcode = req.body.zipcode
  currency = req.body.currency
  firstName = req.body.firstName
  lastName = req.body.lastName
  phoneNumber = req.body.phoneNumber
  email = req.body.email
  console.log('data from Cart.js', modelID,materialID,materialName, finishID, finishingName, materialPrice, scale, shippingPrice, shippingType, daysInTransit, countryCode, stateCode, zipcode, city, currency, firstName, lastName, phoneNumber, email)
}