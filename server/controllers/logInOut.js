const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
require("../../db/connection/connect");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");

// login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log(` ${email} : ${password} :  ${role}`);

    let user;
    if (role === "student") {
      user = await studentRegister.findOne({ email: email });
    } else if (role === "teacher") {
      user = await teacherRegister.findOne({ email: email });
    }

    if (!user) {
      res.status(401).json({ message: "unauthorized" });
    }

    // if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(401).json({ message: "unauthorized" });
    }

    //TODO token regenrate hona chaiye after sometime, for secuirty purpose
    // genrating jwt token
    try {
      const token = jwt.sign({ _id: user._id, role: user.role }, privateKey, {
        algorithm: "ES256",
        expiresIn: "1h",
      });

      console.log(` token generated`);

      // cookies set
      await res.cookie("jwt", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });

      return res.status(200).redirect(`/${user.role}/dashboard`);
    } catch (err) {
      console.log(`error handling token : ${err}`);
    }

    // }
  } catch (error) {
    console.log(error);
    res.status(400).send("unauthorized");
  }
};

// logout
exports.logout = async (req, res) => {
  await res.clearCookie("jwt");
  console.log("clear cookie");
  res.status(201).redirect("/");
};
