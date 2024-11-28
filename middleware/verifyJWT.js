require("dotenv").config();
const jwt = require("jsonwebtoken");

const { studentRegister } = require("../db/models/studentSchema");
const { teacherRegister } = require("../db/models/teacherSchema");
const { adminRegister } = require("../db/models/adminSchema");

const fs = require("fs");
// const publicKey = fs.readFileSync(process.env.ACCESS_PUBLIC_KEY, "utf8");
const publickey = fs.readFileSync('public.pem', 'utf8');

// auth middleware
const auth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.jwtAccess;

    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // if (!authHeader?.startsWith("Bearer")) {
    //   res.status(401).json({ message: "unauthorized" });
    // }

    if (!accessToken) {
      res.status(401).json({ message: "unauthorized" });
    }

    // const accessToken = authHeader.spilt(" ")[1];

    try {
      const decoded = jwt.verify(accessToken, publickey, {
        algorithms: "ES256",
      });

      req.role = decoded.role;

      if (req.role === "student") {
        user = await studentRegister.findOne({ _id: decoded._id });
      } else if (req.role === "teacher") {
        user = await teacherRegister.findOne({ _id: decoded._id });
      } else if (req.role === "admin") {
        user = await adminRegister.findOne({ _id: decoded._id });
      }

      req.user = user;
      req.accessToken = accessToken;

      next();
    } catch (error) {
      console.log(`access verify access error : ${error}`);
      res.status(403).json({ message: "Forbidden" });
    }
  } catch {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;
