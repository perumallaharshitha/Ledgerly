import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "../config/db.js";
import transactionRoutes from "../routes/transactionRoutes.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/transactions", transactionRoutes);

export default app;
