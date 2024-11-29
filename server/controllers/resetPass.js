require("../../db/connection/connect");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const { adminRegister } = require("../../db/models/adminSchema");
const otp = require("../../db/models/otpSchema");
const otpSendEmail = require("../../utils/sendEmail");
const mongoose = require("mongoose");

require("dotenv").config();
const bcrypt = require("bcryptjs");

function generateOtp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function otpMailOptions(otp, recipientEmail, subject) {
  let message = {
    from: "your-email@gmail.com",
    // to: "your-email@gmail.com", // Or any placeholder email
    bcc: [recipientEmail], // BCC hides recipients
    subject: `${subject}`,
    text: `
      Your One-Time Password (OTP)

      Dear User,

      Your OTP code for secure access is: ${otp}

      Please use this code to complete your action. This code will expire in 5 minutes.

      If you did not request this OTP, please ignore this email.
    `,
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>

                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                        margin: 0;
                        padding: 0;
                    }
                  
                    .container {
                        background-color: #ffffff;
                        width: 600px;
                        margin: 50px auto;
                        padding: 30px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                  
                    .logo {
                        max-width: 100px;
                        margin: 0 auto;
                        display: block;
                        padding: 20px 0;
                    }
                  
                    h1 {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                  
                    p {
                        text-align: center;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                  
                    .otp {
                        background-color: #007BFF;
                        color: #ffffff;
                        font-size: 24px;
                        padding: 10px 20px;
                        margin: 20px auto;
                        display: block;
                        width: 150px;
                        text-align: center;
                        border-radius: 5px;
                    }
                  
                    .validity {
                        font-size: 14px;
                        text-align: center;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="https://via.placeholder.com/100x50" alt="Logo" class="logo">
                    <h1>Your One Time Password (OTP)</h1>
                    <p class="otp">${otp}</p>
                    <p class="validity">Please enter this OTP within 10 minutes to verify your identity.</p>
                </div>
            </body>
            </html>`,
  };

  return message;
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
      try {
        const otpCode = generateOtp();
        console.log(`otp : ${otpCode}`);

        const existingOtp = await otp.findOne({ email: user.email });

        let savedOtp;
        if (existingOtp) {
          existingOtp.otp = otpCode; //updates otp
          existingOtp.createdAt = new Date(Date.now()); //expires the existing otp
          savedOtp = await existingOtp.save();
        } else {
          var storeOtpObject = new otp({
            email: user.email,
            role: user.role,
            otp: otpCode,
          });
          savedOtp = await storeOtpObject.save();
        }

        const subject = "Reset OTP";

        const emails = [user.email];

        const mailOptions = otpMailOptions(otpCode, emails, subject);

        otpSendEmail(mailOptions)
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
    console.log("jbbjhghj");

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
