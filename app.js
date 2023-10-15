require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

require("./db/connection/connect");
const routes = require("./server/routes/route");

// paths
const staticPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

// static file access
app.use(express.static(staticPath));

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using hbs as view engine
app.set("view engine", "hbs");

// setting views directory
app.set("views", viewsPath);
// register partials
hbs.registerPartials(partialsPath);

app.use("/", routes);

// listening server port
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
