const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
      required: true,
    },
    phNum: {
      type: Number,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "member", "seller"],
      default: "member",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
