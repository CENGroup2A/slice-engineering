var express = require('express');
axios = require('axios');
 router = express.Router();
 const stripe = require("stripe")("sk_test_vrSlShE1472LRsD5AKWdfE8x00LfJAbOgu");

var cartItem="";
var FormData = require('form-data');
var neededData = {
  modelID : "",
  materialID : "",
  finishID : "",
  materialPrice : "",
  scale : "",
  quantity : "1",
  surfaceCm2 : "1",
  volumeCm3 : "1",
  xDimMm : "1",
  yDimMm : "1",
  zDimMm : "1",
  countryCode : "US",
  stateCode : "",
  city : "",
  zipcode : "",
  currency : "USD",
  firstName : "",
  lastName : "",
  phoneNumber : "",
  email : "",
  address : "",
  totalPrice : ""
}

//Price Variables
var quantity = "1"

//Variables for FetchCartID
var cartItemID

function FetchCartItem()
{
  var example = {
    "cartItems":[
       {
          "toolID":process.envimaterialize_TOOLID || require('../config/config').imaterialize.toolId,
          "MyCartItemReference":"current cart item",
          "modelID":neededData.modelID,
          "fileScaleFactor":neededData.scale,
          "materialID":neededData.materialID,
          "finishID":neededData.finishID,
          "quantity":neededData.quantity,
          "xDimMm":neededData.xDimMm,
          "yDimMm":neededData.yDimMm,
          "zDimMm":neededData.zDimMm,
          "volumeCm3":neededData.volumeCm3,
          "surfaceCm2":neededData.surfaceCm2,
          "iMatAPIPrice": neededData.totalPrice,
          "mySalesPrice": neededData.totalPrice
       }
    ],
    "currency":neededData.currency
}
console.log(example)
 var form = new FormData()
 form.append("data", JSON.stringify(example), {filename:"blob", contentType: 'application/json'})
 //console.log(form)

  return axios.post('https://imatsandbox.materialise.net/web-api/cartitems/register',
  form,
  {
    headers: form.getHeaders()
  })
  .then((data) =>
  {
    console.log("data.data",data.data.cartItems);
    cartItem=data.data;
    cartItemID=data.data.cartItems[0].cartItemID
    return Promise.resolve(data.data.modelID)
  })
  .catch((error) =>
  {
    console.error(error)
  })
}

async function FetchCartID(){
  console.log({
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
    }})
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
    shipmentService: "Express"
  }

 var form = new FormData()
 form.append("data", JSON.stringify(example), {filename:"blob", contentType: 'application/json'})

  return axios.post('https://imatsandbox.materialise.net/web-api/order/post',
  form,
  {
    headers: {...form.getHeaders(), "APICode": process.env.imaterialize_API || require('../config/config').imaterialize.API}
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
  Estimate.findOne({"_id": req.body.token})
  .then((estimate) =>
  {
    var shippment = req.body.shippment
    neededData.modelID = estimate.modelID
    neededData.materialID = estimate.materialID
    neededData.finishID = estimate.finishID
    neededData.scale = estimate.scale
    neededData.totalPrice = estimate.totalPrice
    neededData.firstName = shippment.firstname
    neededData.lastName = shippment.lastname
    neededData.address = shippment.address
    neededData.city = shippment.city
    neededData.zipcode = shippment.zipcode
    neededData.stateCode = shippment.state
    neededData.email = "rbernardo@ufl.edu"
    neededData.phoneNumber = "0000000000"
    console.log(neededData)
    FetchCartItem()
    .then(() =>
    {
      FetchCartID()
      .then(() =>
      {
        FetchCheckout()
        .then(() =>
        {
          console.log(req.body.stripeToken)
          stripe.charges.create({
            amount: cartCheckout.totalPrice*100,
            currency: "usd",
            description: "",
          source: req.body.stripeToken.token.id
          })
          res.json(cartCheckout)
        })
      })
    })
  })
  
}

exports.getDataFromCart = (req, res) =>
{
  neededData = req.body
  console.log('data', neededData)
}
