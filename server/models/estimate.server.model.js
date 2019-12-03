const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This code is used to verify an email address
const Estimate = new Schema(
  {
    modelID : String,
    materialID : String,
    finishID : String,
    scale : String,
    totalPrice : Number,
    shipmentCost : Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Estimate", Estimate);
