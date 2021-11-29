const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const SuperadminRoute = require("./routes/superadmincontrols");
const UserRoute = require("./routes/userRoute");
const Authroute = require("./routes/authentication");

mongoose.connect("mongodb://localhost:27017/S9MiniProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

const app = express();

app.use(
  cors({
    orgin: "*",
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.use("/api", Authroute);
app.use("/api/superadmin", SuperadminRoute);
app.use("/api/user", UserRoute);
