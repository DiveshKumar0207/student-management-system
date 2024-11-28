const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const course = require("../../db/models/courseSchema");
const attendanceRegister = require("../../db/models/attendanceSchema");

exports.attendance = async (req, res) => {
  try {
    const courseDetail = await course.find();

    res.render("attendance", { courseDetail });
  } catch (err) {
    console.log(err);
  }
};

// page to mark attendance
exports.markAttendance = async (req, res) => {
  const courseID = req.params.courseID;

  try {
    // getting course detail and its course-name
    const courseChoosen = await course.findOne({ _id: courseID });
    const courseChoosenID = courseChoosen._id;

    // getting students-list as per required course
    const studentsList = await studentRegister.find(
      { course: courseChoosenID },
      { firstname: 1, rollno: 1 }
    );

    res.render("attendance_mark", { studentsList, courseChoosenID });
  } catch (error) {
    console.log(error);
  }
};

// marking and then posting attendance
exports.postAttendance = async (req, res) => {
  const courseID = req.params.courseID;
  try {
    const userCourse = await course.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    let studentNames = Object.values(req.body.studentName);
    let studentRollnos = Object.values(req.body.studentRollno);
    let studentAttendances = Object.values(req.body.studentAttendance);

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

    res.redirect("/admin/attendance");
  } catch (err) {
    console.log(err);
  }
};

// attendance for current date
exports.viewAttendancePage = async (req, res) => {
  const courseID = req.params.courseID;

  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  let date = d.getDate();
  date < 10 ? `0${date}` : date;
  const defaultDate = `${year}-${month}-${date}`;

  try {
    // getting course detail and its course-name
    const userCourse = await course.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    const studentAttendance = await attendanceRegister.find({
      batch: studentsCourse,
      attendancedate: defaultDate,
    });

    res.render("attendance_view", { studentAttendance, userCourse });
  } catch (error) {
    console.log(error);
  }
};

//
exports.searchAttendance = async (req, res) => {
  const courseID = req.params.courseID;

  try {
    // getting course detail and its course-name
    const userCourse = await course.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    const searchDate = req.query.searchAttendanceDate;

    const studentAttendance = await attendanceRegister.find({
      batch: studentsCourse,
      attendancedate: searchDate,
    });

    res.render("attendance_view", { studentAttendance, userCourse });
  } catch (error) {
    console.log(error);
  }
};
