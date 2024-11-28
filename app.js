const express = require("express");
const hpp = require("hpp");
const helmet = require("helmet");
const { RateLimiterMemory } = require("rate-limiter-flexible");
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

app.use(express.static(staticPath));

// app.use((req, res, next) => {
//   let rawBody = "";
//   req.on("data", (chunk) => {
//     rawBody += chunk.toString();
//   });
//   req.on("end", () => {
//     console.log("Raw Body:", rawBody);
//     next();
//   });
// });

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());
// Enable Helmet middleware for secure HTTP headers
// app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
    },
  })
);

// Enable HPP middleware to prevent HTTP Parameter Pollution attacks
app.use(hpp());

// Example rate limiting with rate-limiter-flexible
const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 1, // Per second
});

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      // Request allowed, continue to the next middleware or route handler
      next();
    })
    .catch(() => {
      // Request denied due to rate limiting
      res.status(429).send("Too Many Requests");
    });
});

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

if (process.env.NODE_ENV === "development") {
  // Development environment error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  });
} else {
  // Production environment error handling
  app.use((err, req, res, next) => {
    res.status(500).send("Internal Server Error");
  });
}

// listening server port
app.listen(PORT, () => {
  console.log(
    `server running at ${PORT} || http://127.0.0.1:${PORT} || http://localhost:${PORT}`
  );
});
