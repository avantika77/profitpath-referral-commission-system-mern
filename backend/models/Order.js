const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  mediatorCode: String,
  price: Number,
  commission: Number
});

module.exports = mongoose.model("Order", OrderSchema);