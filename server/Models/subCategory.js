const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
   name:{
    type:String
   }
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
