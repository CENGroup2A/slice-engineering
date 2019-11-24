var express = require('express');
axios = require('axios');
 router = express.Router();
 config = require('../config/config');

var cartID="";



  
  async function FetchCartItem(){
    let data =await axios.post('https://imatsandbox.materialise.net/web-api/cartitems/register', 
    {
      
        
    cartItems:[
        {
            toolID:"2efbcc6f-fe98-406f-8cd1-92b133aae7c3",
            MyCartItemReference:"",
            modelID:"09fa85ba-9e43-4ccc-8d74-dd75dc4d84c7",
            modelFileName:"",
            fileUnits:"mm",
            fileScaleFactor:"1",
            materialID:"035f4772-da8a-400b-8be4-2dd344b28ddb",
            finishID:"bba2bebb-8895-4049-aeb0-ab651cee2597",
            quantity:"1",
            xDimMm:"12",
            yDimMm:"12",
            zDimMm:"12",
            volumeCm3:"12",
            surfaceCm2:"100",
            iMatAPIPrice: "25",
            mySalesPrice: "26",
        }
    ],
    currency:"USD",

     
        
    })
    console.log("data.data",data.data.cartItems);
    cartID=data.data;
    return(data.data.modelID)
  }





exports.sendCartID = (req, res)=>
{
  FetchCartItem()
  .then(() =>
  {
    res.json(cartID)
  })
}

