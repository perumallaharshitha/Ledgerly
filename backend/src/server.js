require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => res.send("Ledgerly API is running!"));

module.exports = app;
