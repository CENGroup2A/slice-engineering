var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartItem="";



  
  async function FetchCartItem(){
    let data =await axios.post('https://imatsandbox.materialise.net/web-api/cartitems/register', 
    {
      "cartItems":[
         {
            toolID:"2efbcc6f-fe98-406f-8cd1-92b133aae7c3",
            MyCartItemReference:"some reference",
            modelID:"98370d93-b607-4e79-a7ed-ff4f8bfcd016",
            modelFileName:"",
            fileUnits:"mm",
            fileScaleFactor:"1",
            materialID:"035f4772-da8a-400b-8be4-2dd344b28ddb",
            finishID:"bba2bebb-8895-4049-aeb0-ab651cee2597",
            quantity:"1",
            xDimMm:"12",
            yDimMm:"12",
            zDimMm:"12",
            volumeCm3:"2.0",
            surfaceCm2:"100.0",
            iMatAPIPrice: "25.0",
            mySalesPrice: "26.0",
         }
      ],
      currency:"USD"
   },
   {
    headers: {
      "accept": "application/json",
      
    }
  })
    console.log("data.data",data.data);
    cartItem=data.data;
    return(data.data.modelID)
  }





exports.sendCartItem = (req, res)=>
{
  FetchCartItem()
  .then(() =>
  {
    res.json(cartItem)
  })
}

