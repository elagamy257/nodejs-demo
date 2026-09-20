const mongoose = require("mongoose");

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Connection Failed To MongoDB!", error.message);
  }
}

module.exports = connectToDB;
