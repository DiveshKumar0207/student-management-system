require("dotenv").config();
const mongoose = require("mongoose");

// const URL = "mongodb://127.0.0.1:27017/";

mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
    console.log(`MongoDB URL: ${process.env.mongoURL}`);
  })
  .catch((err) => {
    console.error("MongoDB connection failed : \n", err);
    console.log(`MongoDB URL: ${process.env.mongoURL} \n`);
  });
