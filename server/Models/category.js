const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
   name:{
    type:String
   },
   description:{
       type:String
   },
   sub_categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
