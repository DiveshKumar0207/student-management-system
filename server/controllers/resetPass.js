require("../../db/connection/connect");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const { adminRegister } = require("../../db/models/adminSchema");
const otp = require("../../db/models/otpSchema");
const otpSendEmail = require("../controllers/sendEmail");
const mongoose = require("mongoose");

require("dotenv").config();
const bcrypt = require("bcryptjs");

function generateOtp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
exports.verifyEmailPage = (req, res) => {
  res.render("verifyEmail");
};

//
exports.sendOtp = async (req, res) => {
  const userEmail = req.body.email;
  const userRole = req.body.role;
  let user;
  try {
    if (userRole === "admin") {
      user = await adminRegister.findOne({ email: userEmail });
    } else if (userRole === "student") {
      user = await studentRegister.findOne({ email: userEmail });
    } else if (userRole === "teacher") {
      user = await teacherRegister.findOne({ email: userEmail });
    }

    if (user) {
      const otpCode = generateOtp();
      const storeOtp = new otp({
        email: user.email,
        role: user.role,
        otp: otpCode,
      });

      try {
        const savedOtp = await storeOtp.save();
        console.log("otp stored");

        otpSendEmail(otpCode, user.email)
          .then(() => {
            console.log("OTP sent to your mail");
          })
          .catch((error) => console.log(error));

        res.redirect(`/login/verify/otp/${savedOtp._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//
exports.verifyOtpPage = async (req, res) => {
  const userOtpID = req.params.otpID;
  res.render("verifyOtp", { userOtpID });
};

//
exports.verifyOtp = async (req, res) => {
  const userOtpID = req.params.otpID;
  const { otp1, otp2, otp3, otp4, otp5, otp6 } = req.body;
  const enteredOtp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

  try {
    const otpDB = await otp.findOne({ _id: userOtpID });
    if (!otpDB) {
      res.status(404).json({ error: "User not found" });
    }

    if (!enteredOtp === otpDB.otp) {
      res.status(404).json({ error: "otp is wrong" });
    } else if (enteredOtp === otpDB.otp) {
      console.log("correct otp. Progress to change password ::");
      res.redirect(`/login/reset/password/${userOtpID}`);
    }
  } catch (error) {
    console.log(error);
  }
};

//
exports.resetPasswordPage = async (req, res) => {
  const userOtpID = req.params.otpID;

  try {
    const userEmail = await otp.findOne(
      { _id: userOtpID },
      { email: 1, role: 1 }
    );
    let realUser;

    if (userEmail.role === "admin") {
      realUser = await adminRegister.findOne(
        { email: userEmail.email },
        { email: 1, password: 1, role: 1 }
      );
    } else if (userEmail.role === "student") {
      realUser = await studentRegister.findOne(
        { email: userEmail.email },
        { email: 1, password: 1, role: 1 }
      );
    } else if (userEmail.role === "teacher") {
      realUser = await teacherRegister.findOne(
        { email: userEmail.email },
        { email: 1, password: 1, role: 1 }
      );
    }

    if (realUser) {
      console.log(realUser);

      res.render("resetPassword", { realUser });
    }
  } catch (error) {
    console.log(error);
  }
};

//
exports.resetPassword = async (req, res) => {
  const { userRole, userID } = req.params;
  const enteredPassword = req.body.password;
  const enteredConfirmPassword = req.body.confirmPassword;
  try {
    if (enteredPassword === enteredConfirmPassword) {
      //
      const Model = mongoose.model(`${userRole}register`);

      const saltRounds = 11;

      try {
        var hashPassword = await bcrypt.hash(enteredPassword, saltRounds);
      } catch (error) {
        throw new error("hash failed !");
      }

      const updatedData = await Model.findOneAndUpdate(
        { _id: userID },
        { password: hashPassword },
        { new: true }
      );

      try {
        await updatedData.save();
        console.log("password updated");

        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
