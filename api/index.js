import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config(".env");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


app.use(cors({
  origin: ['http://localhost:50419','http://localhost:3001','http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003', 'http://house-hub.eastus.cloudapp.azure.com','http://house-hub.eastus.cloudapp.azure.com:3000'], // Update with the appropriate client URL
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));


app.use(cookieParser())
app.use(express.json());
// simple get health check
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
