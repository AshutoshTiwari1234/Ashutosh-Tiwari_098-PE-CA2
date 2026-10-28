const mongoose = require("mongoose");
async function connectDB() {
  const uri = process.env.MONGODB_URL;
  await mongoose.connect(uri);
  console.log("Connected to Database");
}
module.exports = connectDB;
