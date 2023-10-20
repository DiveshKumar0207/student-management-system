require("dotenv").config();
const jwt = require("jsonwebtoken");

const fs = require("fs");
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY, "utf8");

// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "unauthorized" });
    }

    try {
      jwt.verify(token, publicKey, { algorithms: "ES256" });
      console.log(`verified token `);
      // console.log(req.user);
      next();
    } catch (error) {
      console.log(`verify error : ${error}`);
      res.status(403).json({ message: "Forbidden" });
    }
  } catch {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;
