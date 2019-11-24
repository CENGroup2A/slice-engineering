var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');



 var mat;
 var finish;


  
  async function FetchCartItem(){
    let data =await axios.post('https://imatsandbox.materialise.net/web-api/cartitems/register', 
    {
      
        
    cartItems:[
        {
            toolID:"2054608d-b469-4cab-adeb-cf1c0569e7a1",
            MyCartItemReference:"some reference",
            modelID:"",
            modelFileName:"Box.stl",
            fileUnits:"mm",
            fileScaleFactor:"1",
            materialID:"035f4772-da8a-400b-8be4-2dd344b28ddb",
            finishID:"bba2bebb-8895-4049-aeb0-ab651cee2597",
            quantity:"1",
            xDimMm:"1",
            yDimMm:"1",
            zDimMm:"1",
            volumeCm3:"1",
            surfaceCm2:"1",
            iMatAPIPrice: "0",
            mySalesPrice: "0",
        }
    ],
    currency:"EUR",

      headers: {
        "accept": "application/json",
      }
        
    })
    console.log("data.data",data.data);
    return(data.data.modelID)
  }




exports.sendCartID = (req, res)=>
{


  FetchCartItem(mat,finish,countryCode,stateCode)
  .then(() =>
  {
    res.json(price)
  })
}

