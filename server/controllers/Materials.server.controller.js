var express = require('express');
    request = require('request');
    router = express.Router();

 
var listOfMats = [];

request('https://imatsandbox.materialise.net/web-api/materials?user=lysaght.m@ufl.edu',
(error, response, body) =>
{
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body)
    //console.log(data);
    
    //var listOfMats = [];
    data.materials.forEach(function(element){
      
      //listOfMats = listOfMats + element.name;
      listOfMats.push(element)
    });
    // module.exports=listOfMats;
    // console.log(listOfMats)
    // res.json(data.materials)
    // res.end()
  }else{console.log("ERROR")}
})

exports.material = (req, res)=>
{
  res.json(listOfMats)
}
