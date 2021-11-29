const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: {
      type: String,
    },
    city:{
        type:String,
    },
    postalCode: {
        type:Number
    },
    country: {
        type:String
    },
    phoneNumber:{
        type:String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("userAddress", userAddressSchema);
module.exports = User;
