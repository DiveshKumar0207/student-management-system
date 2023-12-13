const noticeModel = require("../../db/models/noticeSchema");
const courseModel = require("../../db/models/courseSchema");
const attendanceModel = require("../../db/models/attendanceSchema");
const { studentRegister } = require("../../db/models/studentSchema");

exports.home_teachers = async (req, res) => {
  try {
    const noticedisp = await noticeModel.find();
    // req.user is defined in JWTverify middleware
    const { firstname, telephone, teacherid, salary, _id } = req.user;

    // console.log({ firstname, telephone, teacherid, salary, _id });
    res.render("home_teachers", {
      noticedisp,
      firstname,
      telephone,
      teacherid,
      salary,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.T_attendance = async (req, res) => {
  try {
    const courseDetail = await courseModel.find();

    res.render("T_attendance", { courseDetail });
  } catch (error) {
    console.log(error);
  }
};

// page to mark attendance
exports.T_markAttendancePage = async (req, res) => {
  const courseID = req.params.courseID;

  try {
    // getting course detail and its course-name
    const courseChoosen = await courseModel.findOne({ _id: courseID });
    const courseChoosenID = courseChoosen._id;

    // getting students-list as per required course
    const studentsList = await studentRegister.find(
      { course: courseChoosenID },
      { firstname: 1, rollno: 1 }
    );

    res.render("T_mark_attendance", { studentsList, courseChoosenID });
  } catch (error) {
    console.log(error);
  }
};

// marking and then posting attendance
exports.T_postAttendance = async (req, res) => {
  const courseID = req.params.courseID;
  try {
    const userCourse = await courseModel.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    let studentNames = req.body.studentName;
    let studentRollnos = req.body.studentRollno;
    let studentAttendances = req.body.studentAttendance;

    // Ensure studentNames is an array
    if (!Array.isArray(studentNames)) {
      studentNames = [studentNames];
      studentRollnos = [studentRollnos];
      studentAttendances = [studentAttendances];
    }

    const attendanceRecord = new attendanceRegister({
      batch: studentsCourse,
      // attendancedate: undefined,
      attendance: [],
    });

    for (let i = 0; i < studentNames.length; i++) {
      attendanceRecord.attendance.push({
        name: studentNames[i],
        rollno: studentRollnos[i],
        attend: studentAttendances[i],
      });
    }

    await attendanceRecord.save();

    res.redirect("/teacher/attendance");
  } catch (err) {
    console.log(err);
  }
};

// attendance for current date
exports.T_viewAttendancePage = async (req, res) => {
  const courseID = req.params.courseID;

  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  let date = d.getDate();
  date < 10 ? `0${date}` : date;
  const defaultDate = `${year}-${month}-${date}`;

  try {
    // getting course detail and its course-name
    const userCourse = await courseModel.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    const studentAttendance = await attendanceModel.find({
      batch: studentsCourse,
      attendancedate: defaultDate,
    });

    res.render("T_view_attendance", { studentAttendance, userCourse });
  } catch (error) {
    console.log(error);
  }
};

//
exports.T_searchAttendance = async (req, res) => {
  const courseID = req.params.courseID;

  try {
    // getting course detail and its course-name
    const userCourse = await courseModel.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    const searchDate = req.query.searchAttendanceDate;

    const studentAttendance = await attendanceModel.find({
      batch: studentsCourse,
      attendancedate: searchDate,
    });

    res.render("T_view_attendance", { studentAttendance, userCourse });
  } catch (error) {
    console.log(error);
  }
};
