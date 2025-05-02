import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';  
dotenv.config();
import router from "./router";
// import { connectKafka, disconnectKafka } from "./configs/kafkaClient";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// connectKafka();
 
const PORT = process.env.PORT || 3001;  

app.listen(PORT, () =>  
  console.log(`Server running on port http://localhost:${PORT}`)  
);
 

const MONGODB_URL = "mongodb://localhost:27017/";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.set("debug", true);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// // Graceful shutdown
// process.on("SIGTERM", async () => {
//   console.log("SIGTERM signal received. Closing connections...");
//   await disconnectKafka();
//   // Close MongoDB connection if applicable
//   // Close Redis connection if needed (ioredis handles reconnection well)
//   process.exit(0);
// });

// process.on("SIGINT", async () => {
//   console.log("SIGINT signal received. Closing connections...");
//   await disconnectKafka();
//   process.exit(0);
// });
app.use("/", router());
