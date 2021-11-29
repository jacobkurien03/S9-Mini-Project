const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
   productname:{
    type:String
   },
   productDesc:{
       type:String
   },
   categoryId:{
       type:mongoose.Schema.Types.ObjectId,
       ref: "Category"
   },
   price:{
       type:Number
   },
//    discountId:{
//        type:mongoose.Schema.Types.ObjectId,
//        ref: "Discount"
//    },
   quantity:{
    type:Number
   }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
