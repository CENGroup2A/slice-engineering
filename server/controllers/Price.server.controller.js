var express = require('express')
  axios = require('axios'),
  router = express.Router(),
  Estimate = require('../models/estimate.server.model')


function getModel(url)
{
  return axios.post('https://imatsandbox.materialise.net/web-api/tool/2efbcc6f-fe98-406f-8cd1-92b133aae7c3/model',
  {
    fileUrl: url,
    fileUnits:"mm"
  },
  {
    headers: {
      "accept": "application/json",
    }})
}

function getEstimate(model, shipment)
{
  return axios.post('https://imatsandbox.materialise.net/web-api/pricing/model',
    {
      models: [
        model
      ],
      shipmentInfo: shipment,
        "currency": "USD"
    },
    {
      headers: {
        "accept": "application/json",
        "APICode": process.envimaterialize_API || require('../config/config').imaterialize.API
      }
    })
}

//Receives the information from Material.js
exports.sendMatFIN = (req, res)=>
{
  getModel(req.body.url)
  .then((data) =>
  {
    var model = {
      "modelID"    : data.data.modelID,
      "materialID" : req.body.material,
      "finishID"   : req.body.finish,
      "quantity"   : "1",
      "scale"      : req.body.scale
    }
    return getEstimate(model,
    {
      countryCode : '',
      stateCode   : '',
      city        : '',
      zipCode     : ''
    })
    .then((price) =>
    {
      var estimate = new Estimate({ ...model,  totalPrice: price.data.models[0].totalPrice })
      return estimate.save()
      .then(() =>
      {
        return Promise.resolve({'price': price, 'estimate': estimate})
      })
    })
  })
  .then((response) =>
  {
    var price = response.price
    var estimate = response.estimate
    var model = price.data.models[0]
    res.json({
      "modelPrice" : model.totalPrice,
      "token" : estimate._id
    })
  })
  .catch((error) =>
    {
      try{
        console.error(error.response.data.error)
      }
      catch
      {
        console.error(error)
      }
    })
}

exports.getShipping = (req, res) =>
{
  Estimate.findOne({"_id": req.body.token})
  .then((estimate) =>
  {
    console.log({
      countryCode : "US",
      stateCode   : req.body.state,
      city        : req.body.city,
      zipCode     : req.body.zipcode
    })
    getEstimate({
      "modelID"    : estimate.modelID,
      "materialID" : estimate.materialID,
      "finishID"   : estimate.finishID,
      "quantity"   : "1",
      "scale"      : estimate.scale
    },
    {
      countryCode : "US",
      stateCode   : req.body.state,
      city        : req.body.city,
      zipCode     : req.body.zipcode
    })
    .then((price) =>
    {
      var model = price.data.models[0]
      res.json({
        "modelPrice" : model.totalPrice,
        "shipmentCost" : price.data.shipmentCost,
        "token" : estimate._id
      })
    })
  })
  
}
