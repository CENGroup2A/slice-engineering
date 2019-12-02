var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartItem
var cartCheckout
var cartId
var FormData = require('form-data');
var neededData

//Price Variables
var quantity = "1"

//Variables for FetchCartID
var cartItemID

function FetchCartItem()
{
  var example = {
    "cartItems":[
       {
          "toolID":config.imaterialize.toolId,
          "MyCartItemReference":"current cart item",
          "modelID":neededData.modelID,
          "fileScaleFactor":neededData.scale,
          "materialID":neededData.materialID,
          "finishID":neededData.finishID,
          "quantity":quantity,
          "xDimMm":neededData.xDimMm,
          "yDimMm":neededData.yDimMm,
          "zDimMm":neededData.zDimMm,
          "volumeCm3":neededData.volumeCm3,
          "surfaceCm2":neededData.surfaceCm2,
          "iMatAPIPrice": neededData.totalPrice,
          "mySalesPrice": neededData.totalPrice,
       }
    ],
    "currency":neededData.currency
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
    Currency: neededData.currency,
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
      FirstName: neededData.firstName,
      LastName: neededData.lastName,
      Email: neededData.email,
      Phone: neededData.phoneNumber,
      Company: "No company",
      Line1: neededData.address,
      Line2:"",
      CountryCode: neededData.countryCode,
      StateCode:neededData.stateCode,
      ZipCode: neededData.zipcode,
      City: neededData.city
    },
    BillingInfo: {
      FirstName: neededData.firstName,
      LastName: neededData.lastName,
      Email: neededData.email,
      Phone: neededData.phoneNumber,
      Company: "No company",
      Line1: neededData.address,
      Line2:"",
      CountryCode: neededData.countryCode,
      StateCode:neededData.stateCode,
      ZipCode: neededData.zipcode,
      City: neededData.city,
      VatNumber: ""
    }
  }, 
  {
    headers: {
      "accept": "application/json",
    }
  })
  console.log("data.data in FetchCartID",data.data);
  cartID=data.data.cartID;
  cartItemID=data.data.cartItems[0].cartItemID
  return(data.data.modelID)
}

function FetchCheckout()
{
  console.log('cartItemID', cartItemID)
  var example = {
    cartID: cartID,
    myOrderReference:"My Order",
    shipmentService:neededData.shippingType
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
      FetchCheckout()
      .then(() =>
      {
        res.json(cartCheckout)
      })
    })
  })
}

exports.getDataFromCart = (req, res) =>
{
  neededData = req.body
  console.log('data', neededData)
}