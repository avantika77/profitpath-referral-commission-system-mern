const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,

  refCode: String,        
  referredBy: String,     
  // customer storing data that referred them, 

  commission: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);