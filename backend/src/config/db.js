const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined in environment variables!");

    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

module.exports = connectDB;
