const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Connection Failed To MongoDB!", error.message);
    process.exit(1);
  }
}

module.exports = connectToDB;
