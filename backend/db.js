const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectToMongo;
