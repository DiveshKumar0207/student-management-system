const noticeModel = require("../../db/models/noticeSchema");
const feeModel = require("../../db/models/feeSchema");
const courseModel = require("../../db/models/courseSchema");
const attendanceModel = require("../../db/models/attendanceSchema");

exports.home_students = async (req, res) => {
  try {
    const noticedisp = await noticeModel.find();
    // req.user is defined in JWTverify middleware
    const { firstname, telephone, rollno, _id } = req.user;
    const fee = await feeModel.findOne(
      { student: _id },
      "amount paymentstatus"
    );

    res.render("home_students", {
      noticedisp,
      firstname,
      telephone,
      rollno,
      fee,
    });
  } catch (error) {
    console.log(error);
  }
};

// attendance for current date
exports.S_viewAttendancePage = async (req, res) => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  let date = d.getDate();
  date < 10 ? `0${date}` : date;
  const defaultDate = `${year}-${month}-${date}`;

  try {
    // defined in middleware
    const { course } = req.user;

    // getting course detail and its course-name
    const userCourse = await courseModel.findOne({ _id: course });
    const studentsCourse = userCourse.courseName;

    const studentAttendance = await attendanceModel.find({
      batch: studentsCourse,
      attendancedate: defaultDate,
    });
    const date = defaultDate;

    res.render("S_attendance", { studentAttendance, date });
  } catch (error) {
    console.log(error);
  }
};

//
exports.S_searchAttendance = async (req, res) => {
  try {
    // defined in middleware
    const { course } = req.user;

    // getting course detail and its course-name
    const userCourse = await courseModel.findOne({ _id: course });
    const studentsCourse = userCourse.courseName;

    const searchDate = req.query.searchAttendanceDate;

    const studentAttendance = await attendanceModel.find({
      batch: studentsCourse,
      attendancedate: searchDate,
    });

    const date = searchDate;

    res.render("S_attendance", { studentAttendance, date });
    // res.redirect("/student/viewAttendance");
  } catch (error) {
    console.log(error);
  }
};
