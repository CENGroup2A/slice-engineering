const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderEmailCode = new Schema(
	{
	  order_number : String,
	  status: String,
	  email : String,
	  username : String
	},
	{ timestamps: true }
  );

var OrderCode = mongoose.model("OrderEmailCode", OrderEmailCode);

module.exports = OrderCode;
