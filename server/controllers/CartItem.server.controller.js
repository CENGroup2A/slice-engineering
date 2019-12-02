var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartItem="";
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

function FetchCheckout()
{
  console.log('cartItemID', cartItemID)
  var example = {
    cartID: cartItemID,
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