var express = require('express');
    request = require('request');
    router = express.Router();

 
var listOfMats = [];

request('https://imatsandbox.materialise.net/web-api/materials?user=lysaght.m@ufl.edu',
(error, response, body) =>
{
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body)
    
    data.materials.forEach(function(element){
      listOfMats.push(element)
    });
    
  }else{console.log("ERROR")}
})

exports.material = (req, res)=>
{
  res.json(listOfMats)
}