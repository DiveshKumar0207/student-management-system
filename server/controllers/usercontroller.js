// require model and db connection
const {
   studentRegister,
   teacherRegister,
} = require("../../db/models/register");
require("../../db/connection/connect");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");

exports.index = (req, res) => {
   res.render("index");
};
exports.inquiry_post = (req, res) => {
   res.render("inquiry_post");
};
exports.home = (req, res) => {
   res.render("home");
};
exports.home_students = (req, res) => {
   res.render("home_students");
};
exports.home_teachers = (req, res) => {
   res.render("home_teachers");
};

//
exports.inquiry = (req, res) => {
   res.render("inquiry");
};
exports.courses = (req, res) => {
   res.render("courses");
};
exports.teachers = (req, res) => {
   res.render("teachers");
};
exports.students = (req, res) => {
   res.render("students");
};
exports.attendance = (req, res) => {
   res.render("attendance");
};
exports.fee = (req, res) => {
   res.render("fee");
};
exports.notice = (req, res) => {
   res.render("notice");
};

exports.T_attendance = (req, res) => {
   res.render("T_attendance");
};
exports.S_attendance = (req, res) => {
   res.render("S_attendance");
};

//
exports.addStudent = (req, res) => {
   res.render("add_students");
};
exports.addTeacher = (req, res) => {
   res.render("add_teachers");
};

//register student
exports.register_student = async (req, res) => {
   try {
      const stdRegister = new studentRegister({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         password: req.body.password,
         telephone: req.body.telephone,
         address: req.body.address,
         rollno: req.body.rollno,
         fees: req.body.fees,
         course: req.body.course,
         joiningdate: req.body.joiningdate || undefined,
         dob: req.body.dob,
         profilepic: req.body.profilepic,
      });
      if (req.file) {
         stdRegister.profilepic = {
            contentType: req.file.mimetype,
            data: req.file.buffer,
         };
      }
      // const token = await stdRegister.generateAuthToken();
      // console.log(`token part ${token}`);

      await stdRegister.save();
      console.log("Successful registration of Student.");

      res.status(201).render("add_Students");
   } catch (error) {
      res.status(400).send(error);
      console.log(error);
   }
};

// register teacher
exports.register_teacher = async (req, res) => {
   try {
      const stdRegister = new teacherRegister({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         password: req.body.password,
         telephone: req.body.telephone,
         address: req.body.address,
         teacherid: req.body.teacherid,
         salary: req.body.salary,
         teachingcourse: req.body.teachingcourse,
         joiningdate: req.body.joiningdate || undefined,
         dob: req.body.dob,
         profilepic: req.body.profilepic,
      });
      if (req.file) {
         stdRegister.profilepic = {
            contentType: req.file.mimetype,
            data: req.file.buffer,
         };
      }
      await stdRegister.save();
      console.log("Successful registration of Teacher.");
      res.status(201).render("add_teachers");
   } catch (error) {
      res.status(400).send(error);
      console.log(error);
   }
};

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
         const token = jwt.sign(
            { email: user.email, role: user.role },
            privateKey,
            { algorithm: "ES256", expiresIn: "1h" }
         );

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
      res.status(400).send("unauthorized");
   }
};

// logout
exports.logout = async (req, res) => {
   await res.clearCookie("jwt");
   console.log("clear cookie");
   res.status(201).redirect("/");
};
