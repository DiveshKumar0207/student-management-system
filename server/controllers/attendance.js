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

//
exports.markAttendance = async (req, res) => {
  const courseID = req.params.courseID;

  try {
    // getting course detail and its course-name
    const userCourse = await course.findOne({ _id: courseID });
    studentsCourse = userCourse.courseName;

    // getting students-list as per required course
    const studentsList = await studentRegister.find(
      { course: studentsCourse },
      { firstname: 1, rollno: 1 }
    );

    res.render("attendance_mark", { studentsList, userCourse });
  } catch (error) {
    console.log(error);
  }
};

//
exports.postAttendance = async (req, res) => {
  const courseID = req.params.courseID;
  try {
    const userCourse = await course.findOne({ _id: courseID });
    const studentsCourse = userCourse.courseName;

    let studentNames = req.body.studentName;
    let studentRollnos = req.body.studentRollno;
    let studentAttendances = req.body.studentAttendance;
    // console.log(studentNames, studentRollnos, studentAttendances);

    // Ensure studentNames is an array
    if (!Array.isArray(studentNames)) {
      studentNames = [studentNames];
      studentRollnos = [studentRollnos];
      studentAttendances = [studentAttendances];
    }

    const attendanceRecord = new attendanceRegister({
      batch: studentsCourse,
      attendancedate: undefined,
      attendance: [],
    });

    for (let i = 0; i < studentNames.length; i++) {
      attendanceRecord.attendance.push({
        name: studentNames[i],
        rollno: studentRollnos[i],
        attend: studentAttendances[i],
      });
    }

    await attendanceRecord
      .save()
      .then(() => {
        console.log("attendance mark \n");
      })
      .catch((error) => {
        console.log(`save error:  ${error}`);
      });

    res.redirect("/admin/attendance");
  } catch (err) {
    console.log(err);
  }
};

//
exports.viewAttendance = async (req, res) => {
  res.render("attendance_view");
};
