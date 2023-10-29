require("../../db/connection/connect");
const course = require("../../db/models/courseSchema");
// const { studentRegister } = require("../../db/models/studentSchema");
// const { teacherRegister } = require("../../db/models/teacherSchema");

exports.index = (req, res) => {
  res.render("index");
};
exports.inquiry_post = (req, res) => {
  res.render("inquiry_post");
};
// exports.home = (req, res) => {
//   res.render("home");
// };
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
// exports.courses = (req, res) => {
//   res.render("courses");
// };
exports.teachers = (req, res) => {
  res.render("teachers");
};
exports.students = (req, res) => {
  res.render("students");
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
exports.addStudent = async (req, res) => {
  const courseAvailable = await course.find();

  res.render("add_students", { courseAvailable });
};

exports.addTeacher = async (req, res) => {
  const courseAvailable = await course.find();

  res.render("add_teachers", { courseAvailable });
};
