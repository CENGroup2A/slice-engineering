var express = require('express')
  axios = require('axios'),
  router = express.Router(),
  Estimate = require('../models/estimate.server.model')
  config = require('../config/config');

//Receives the information from Material.js
exports.sendMatFIN = (req, res)=>
{
  axios.post('https://imatsandbox.materialise.net/web-api/tool/2efbcc6f-fe98-406f-8cd1-92b133aae7c3/model',
  {
    fileUrl: req.body.url,
    fileUnits:"mm"
  },
  {
    headers: {
      "accept": "application/json",
    }})
  .then((data) =>
  {
    return axios.post('https://imatsandbox.materialise.net/web-api/pricing/model',
    {
      models: [
        {
          "modelID": data.data.modelID,
          "materialID": req.body.material,
          "finishID": req.body.finish,
          "quantity":"1",
          "scale": req.body.scale
        }
      ],
      shipmentInfo:
      {
        countryCode: req.body.countryCode,
        stateCode: req.body.stateCode,
        city : req.body.city,
        zipCode : req.body.zipcode,
      },
        "currency": req.body.currency
    },
    {
      headers: {
        "accept": "application/json",
        "APICode": config.imaterialize.API
      }
    })
    .then((price) =>
    {
      var model = price.data.models[0]
      var estimate = new Estimate({ 'modelID': model.modelID, 'totalPrice': model.totalPrice })
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
      "shipmentCost" : price.data.shipmentCost,
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

//Sends the Price back to Material.js
exports.getPrice= (req, res)=>
{
  res.json(price)
}