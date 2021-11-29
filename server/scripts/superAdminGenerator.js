const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const mongoose = require("mongoose");

var password = generator.generate({
  length: 10,
  numbers: true,
});

(async () => {
  // connect to mongodb
  await mongoose
    .connect("mongodb://localhost:27017/S9MiniProject", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
  //Delete existing admin
  var superadminuser = await User.findOne({ role: "superadmin" }).catch(
    (error) => {
      console.log(error);
    }
  );
  if (superadminuser) {
    var id = superadminuser._id;
    await User.findByIdAndRemove(id);
  }
  //add new superadmin
  bcrypt.hash(password, 10, function (error, hashedPass) {
    let superadmiin = new User({
      name: "superadmin",
      phnum: "1234567899",
      email: "superadmin@gmail.com",
      username: "superadmin",
      password: hashedPass,
      role: "superadmin",
    });
    superadmiin.save();
    console.log(`username: superadmin
    password: ${password}`);
  });
})();
