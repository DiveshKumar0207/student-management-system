const noticeRegister = require("../../db/models/noticeSchema");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
require("../../db/connection/connect");

// let noticedisp = [];

exports.home = async (req, res) => {
  try {
    const noticedisp = await noticeRegister.find();
    const totalStudents = await studentRegister.find().count();
    const totalTeachers = await teacherRegister.find().count();

    res.render("home", { noticedisp, totalStudents, totalTeachers });
  } catch (err) {
    console.log(err);
  }
};
