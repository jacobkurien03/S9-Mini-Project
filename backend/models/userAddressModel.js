import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,require:true},
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
    }
  },
  { timestamps: true }
);

const UserAddress = mongoose.model("UserAddress", userAddressSchema);
export default UserAddress;
