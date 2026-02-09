import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "../config/db.js";
import walletRoutes from "../routes/walletRoutes.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/wallet", walletRoutes);

export default app;
