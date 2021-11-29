const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    discoutPercent: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Discount", discountSchema);
module.exports = User;
