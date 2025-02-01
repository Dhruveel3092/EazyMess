import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import allowedOrigin from './config/allowedOrigin.js';
import authRoutes from './routes/auth.js'
import verifyToken from "./middleware/authMiddleware.js";

const app = express();

import dotenv from "dotenv";
dotenv.config();

const corsOptions ={
  origin: allowedOrigin, 
  credentials:true,            
  optionSuccessStatus:200,
  sameSite:'none',
  secure:true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth-check", verifyToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true, _id:req._id,username:req.username,email:req.email });
});

app.use('/auth', authRoutes);

mongoose
  .connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(8080, () =>
  console.log(`Server started on 8080`)
); 