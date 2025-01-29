const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const allowedOrigin = require('./config/allowedOrigin')
const app = express();

require("dotenv").config();

const corsOptions ={
  origin: allowedOrigin, 
  credentials:true,            
  optionSuccessStatus:200,
  sameSite:'none',
  secure:true,
}

app.use(cors(corsOptions));
app.use(express.json());




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