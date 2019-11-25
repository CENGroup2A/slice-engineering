const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderEmailCode = new Schema(
	{
	  order_number : Number,
	  email : String,
	  username : String
	},
	{ timestamps: true }
  );

var Order = mongoose.model("OrderEmailCode", OrderEmailCode);

module.exports = Order;
