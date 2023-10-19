require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 3000;

require("./db/connection/connect");
const routes = require("./server/routes/route");

// paths
const staticPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//middleware static file
app.use((req, res, next) => {
   const routePrefix = req.path.split("/")[1];

   if (routePrefix == "") {
      app.use(express.static(staticPath));
   } else if (routePrefix == "admin") {
      app.use("/admin", express.static(staticPath));
   } else if (routePrefix == "teacher") {
      app.use("/teacher", express.static(staticPath));
   } else if (routePrefix == "student") {
      app.use("/student", express.static(staticPath));
   }

   next();
});

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//using hbs as view engine
app.set("view engine", "hbs");

// setting views directory
app.set("views", viewsPath);
// register partials
hbs.registerPartials(partialsPath);

//  routes
app.use("/", routes);

// listening server port
app.listen(PORT, () => {
   console.log(
      `server running at ${PORT} || http://127.0.0.1:${PORT} || http://localhost:${PORT}`
   );
});
