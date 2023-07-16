
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {corsOptions} from "./config/corsOptions"
import cors from "cors" //npm i cors //npm i @types/cors

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors(corsOptions))

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*'); //The same
  res.setHeader("Access-Control-Allow-Origin", "*"); //the same
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use(express.static("client"));

import userRouter from "./API/users/usersRoutes";
app.use("/api/user", userRouter);

import movieRouter from "./API/movies/movieRoutes";
 app.use("/api/movie", movieRouter)

 import bookingsRouter from "./API/bookings/bookingRoutes";
 app.use("/api/booking", bookingsRouter)

 import orderRouter from "./API/orders/ordersRoutes";
 app.use("/api/orders", orderRouter)

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
