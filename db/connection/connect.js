require("dotenv").config();
const mongoose = require("mongoose");

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
