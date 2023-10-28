const express = require("express");
const app = express();

require("dotenv").config();

const hbs = require("hbs");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

require("./db/connection/connect");
const routes = require("./server/routes/route");

const PORT = process.env.PORT || 3000;

// paths
const staticPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//middleware static file
app.use((req, res, next) => {
  const route = req.path.split("/").slice(1, 3).join("/");
  const editRoute = req.path.split("/").slice(1, 4).join("/");

  const routePrefix = req.path.split("/")[1];
  // const secondPrefix = req.path.split("/")[2];
  try {
    if (routePrefix == "") {
      app.use(express.static(staticPath));
      //
    } else if (editRoute == "admin/courses/editCourse") {
      app.use("/admin/courses/editCourse", express.static(staticPath));
      //
    } else if (route == "admin/courses") {
      app.use("/admin/courses", express.static(staticPath));
      //
    } else if (route == "admin/editStudent") {
      app.use("/admin/editStudent", express.static(staticPath));
      //
    } else if (route == "admin/editTeacher") {
      app.use("/admin/editTeacher", express.static(staticPath));
      //
    } else if (routePrefix == "teacher") {
      app.use("/teacher", express.static(staticPath));
      //
    } else if (routePrefix == "student") {
      app.use("/student", express.static(staticPath));
      //
    } else if (routePrefix == "admin") {
      app.use("/admin", express.static(staticPath));
      //
    }
  } catch (err) {
    console.log(err);
  }

  next();
});

//
app.use(cors());

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// hbs helper for equatting 2 thing
hbs.registerHelper("eq", function (a, b) {
  return a == b;
});
hbs.registerHelper("toLowerCase", function (a) {
  return a.toLowerCase();
});

hbs.registerHelper("equalsIgnoreCase", function (str1, str2, options) {
  if (str1 && str2 && str1.toLowerCase() === str2.toLowerCase()) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

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
