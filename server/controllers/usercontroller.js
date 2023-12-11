require("../../db/connection/connect");
const course = require("../../db/models/courseSchema");
// const { studentRegister } = require("../../db/models/studentSchema");
// const { teacherRegister } = require("../../db/models/teacherSchema");

exports.index = (req, res) => {
  res.render("index");
};

exports.home_students = (req, res) => {
  res.render("home_students");
};
exports.home_teachers = (req, res) => {
  res.render("home_teachers");
};

exports.teachers = (req, res) => {
  res.render("teachers");
};
exports.students = (req, res) => {
  res.render("students");
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

exports.errorPage = (req, res) => {
  res.status(404);
  res.render("errorPage");
};
