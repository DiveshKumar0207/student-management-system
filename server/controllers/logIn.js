const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const { adminRegister } = require("../../db/models/adminSchema");
require("../../db/connection/connect");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const accessPrivateKey = fs.readFileSync("private.pem", "utf8");
// const accessPrivateKey = fs.readFileSync(
//   process.env.ACCESS_PRIVATE_KEY,
//   "utf8"
// );
// const refreshPrivateKey = fs.readFileSync(
//   process.env.REFRESH_PRIVATE_KEY,
//   "utf8"
// );

function generateAccessToken(id, role) {
  return jwt.sign({ _id: id, role: role }, accessPrivateKey, {
    algorithm: "ES256",
    // expiresIn: process.env.ACCESS_EXPIRE_TIME,
  });
}
// function generateRefreshToken(id, role) {
//   return jwt.sign({ _id: id, role: role }, refreshPrivateKey, {
//     algorithm: "ES256",
//     expiresIn: process.env.REFRESH_EXPIRE_TIME,
//   });
// }
// login=====================================================
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    if (role === "student") {
      user = await studentRegister.findOne({ email: email });
    } else if (role === "teacher") {
      user = await teacherRegister.findOne({ email: email });
    } else if (role === "admin") {
      user = await adminRegister.findOne({ email: email });
    }

    if (!user) {
      res.status(401).json({ message: "unauthorized" });
    }

    // if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(401).json({ message: "unauthorized" });
    }

    // genrating jwt tokens
    try {
      const accessToken = generateAccessToken(user._id, user.role);

      // const refreshToken = generateRefreshToken(user._id, user.role);
      // console.log("access $ refresh token made");

      // pushing refreshtoken to database
      // await user.refreshtokens.push(refreshToken);

      // setting cookies
      await res.cookie("jwtAccess", accessToken);
      // await res.cookie("jwtRefresh", refreshToken, {
      //   httpOnly: true,
      // });

      await user.save();

      // res.json({ accessToken });

      res.status(200).redirect(`/${user.role}/dashboard`);
    } catch (err) {
      console.log(`error handling token : ${err}`);
    }

    // }
  } catch (error) {
    console.log(error);
    res.status(400).send("unauthorized");
  }
};
