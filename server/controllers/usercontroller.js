// require model and db connection
const {
  studentRegister,
  teacherRegister,
} = require("../../db/models/register");
require("../../db/connection/connect");
const bcrypt = require("bcryptjs");

exports.index = (req, res) => {
  res.render("index");
};
exports.inquiry_post = (req, res) => {
  res.render("inquiry_post");
};
exports.home = (req, res) => {
  res.render("home");
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

//
exports.addStudent = (req, res) => {
  res.render("add_students");
};
exports.addTeacher = (req, res) => {
  res.render("add_teachers");
};

//register
exports.register_student = async (req, res) => {
  try {
    const stdRegister = new studentRegister({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      telephone: req.body.telephone,
      location: req.body.location,
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
    await stdRegister.save();
    console.log("Successful registration of Student.");
    res.status(201).render("add_Students");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

// login
// 0=admin; 1=teacher; 2=student
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userCategory = req.body.user_category;

    if (userCategory == 2) {
      const checkmail = await studentRegister.findOne({ email: email });
      const checkpassword = await bcrypt.compare(password, checkmail.password);
      if (checkpassword) {
        res.status(201).render("home_student");
      } else {
        res.send("Incorrect password or email");
      }
    }
  } catch (error) {
    res.status(400).send("Incorrect password or email");
  }
};
