var express = require('express');
    request = require('request');
    router = express.Router();


var listOfMats = [];

request(process.env.imaterialize_ACCESSID || require('../config/config').imaterialize.accessId,
(error, response, body) =>
{
  if (!error && response.statusCode == 200) {
    console.log("Hello")
    var data = JSON.parse(body)

    data.materials.forEach(function(element){
      listOfMats.push(element)
    });

  } else{console.log("ERROR")}
})

exports.material = (req, res)=>
{
  res.json(listOfMats)
}
