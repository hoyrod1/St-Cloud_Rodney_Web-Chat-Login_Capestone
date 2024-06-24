require("dotenv").config();
//====================================================================//
const mongoose = require("mongoose");
//====================================================================//
mongoose.connect(process.env.MONGO_URI);
//====================================================================//
mongoose.connection
  .on("open", () => console.log("You have connected to Mongoose"))
  .on("close", () => console.log("You have disconnected to Mongoose"))
  .on("error", (error) => console.log(error));
//====================================================================//
module.exports = mongoose;
