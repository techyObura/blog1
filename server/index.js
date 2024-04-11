import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import authRoutes from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import credentials from "./config/credentials.js";
import corsOptions from "./config/corsOptions.js";

const app = express();
const port = 3030;
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

dotenv.config();
mongoose
  .connect(process.env.dbPort)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

  next();
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
