import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
