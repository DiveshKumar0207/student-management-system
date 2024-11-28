require("../../db/connection/connect");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const courseModel = require("../../db/models/courseSchema");
const feeModel = require("../../db/models/feeSchema");

// student

//
exports.students = async (req, res) => {
  try {
    const totalStudent = await studentRegister.find().count();

    const totalFees = await feeModel.aggregate([
      {
        $group: {
          _id: null,
          totalpendingfees: { $sum: "$amount" },
        },
      },
    ]);
    res.render("students", { totalFees, totalStudent });
  } catch (error) {
    console.log(error);
  }
};

//
exports.addStudentPage = async (req, res) => {
  const courseAvailable = await courseModel.find();

  res.render("add_students", { courseAvailable });
};

exports.viewStudent = async (req, res) => {
  try {
    const stdDbData = await studentRegister.find().populate("course").exec();

    let studentData = stdDbData.map((std) => {
      const dob = new Date(std.dob);
      const birthYear = dob.getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      return { ...std, age };
    });

    res.render("detail_students", { studentData });
  } catch (err) {
    console.log(err);
  }
};

// edit student page
exports.editStudent = async (req, res) => {
  // user objectID
  const userID = req.params.id;

  try {
    const stdDbData = await studentRegister.find({ _id: userID });
    const courseAvailable = await courseModel.find();

    let studentData = stdDbData.map((std) => {
      return { ...std, courseAvailable };
    });
    res.render("update_student", { studentData });
  } catch (err) {
    console.log(err);
  }
};

// update student
exports.updateStudent = async (req, res) => {
  const userID = req.params.id;
  const {
    firstname,
    lastname,
    gender,
    email,
    password,
    telephone,
    street,
    city,
    state,
    pincode,
    rollno,
    course,
    joiningdate,
    profilepic,
    dob,
  } = req.body;
  try {
    const courseTook = await courseModel.findOne({ courseName: course });

    const courseTookID = courseTook._id;

    let dataToSend;

    profilepic !== undefined
      ? (dataToSend = {
          firstname,
          lastname,
          gender,
          email,
          password,
          telephone,
          street,
          city,
          state,
          pincode,
          rollno,
          course: courseTookID,
          joiningdate,
          dob,
          profilepic,
        })
      : (dataToSend = {
          firstname,
          lastname,
          gender,
          email,
          password,
          telephone,
          street,
          city,
          state,
          pincode,
          rollno,
          course: courseTookID,
          joiningdate,
          dob,
        });

    //TODO SOLVE ISSUE FOR ADDDING PROFILEPIC ONLY WHEN GIVEN
    const updData = await studentRegister.findOneAndUpdate(
      { _id: userID },
      {
        $set: dataToSend,
      },
      { new: true }
    );
    if (req.file) {
      updData.profilepic = {
        contentType: req.file.mimetpe,
        data: req.file.buffer,
      };
    }

    await updData.save();

    res.redirect("/admin/viewStudent");
  } catch (err) {
    console.log(err);
  }
};

// delete student
exports.deleteStudent = async (req, res) => {
  const userID = req.params.id;
  try {
    await studentRegister.findOneAndDelete({ _id: userID });
    console.log(`Student User deleted`);

    res.redirect("/admin/viewStudent");
  } catch (error) {
    console.log(error);
  }
};

//

// teacher

//
exports.teachers = async (req, res) => {
  try {
    const totalTeacher = await teacherRegister.find().count();

    res.render("teachers", { totalTeacher });
  } catch (error) {
    console.log(error);
  }
};

//

exports.addTeacherPage = async (req, res) => {
  const courseAvailable = await courseModel.find();

  res.render("add_teachers", { courseAvailable });
};

exports.viewTeacher = async (req, res) => {
  try {
    const stdDbData = await teacherRegister.find().populate("teachingcourse");

    let TeacherData = stdDbData.map((std) => {
      const dob = new Date(std.dob);
      const birthYear = dob.getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      return { ...std, age };
    });

    res.render("detail_teachers", { TeacherData });
  } catch (err) {
    console.log(err);
  }
};

// edit teacher
exports.editTeacher = async (req, res) => {
  const userID = req.params.id;

  try {
    const tchrDbData = await teacherRegister.find({ _id: userID });
    const courseAvailable = await courseModel.find();

    let teacherData = tchrDbData.map((std) => {
      return { ...std, courseAvailable };
    });

    res.render("update_teacher", { teacherData });
  } catch (err) {
    console.log(err);
  }
};

// update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const userID = req.params.id;

    const {
      firstname,
      lastname,
      gender,
      email,
      password,
      telephone,
      street,
      city,
      state,
      pincode,
      teacherid,
      salary,
      teachingcourse,
      joiningdate,
      dob,
      profilepic,
    } = req.body;

    const courseTook = await courseModel.findOne({
      courseName: teachingcourse,
    });

    const courseTookID = courseTook._id;

    let dataToSend;

    profilepic !== undefined
      ? (dataToSend = {
          firstname,
          lastname,
          gender,
          teacherid,
          password,
          telephone,
          email,
          street,
          city,
          state,
          pincode,
          teachingcourse: courseTookID,
          salary,
          joiningdate,
          dob,
          profilepic,
        })
      : (dataToSend = {
          firstname,
          lastname,
          gender,
          teacherid,
          password,
          telephone,
          email,
          street,
          city,
          state,
          pincode,
          teachingcourse: courseTookID,
          salary,
          joiningdate,
          dob,
        });

    const updData = await teacherRegister.findOneAndUpdate(
      { _id: userID },
      {
        $set: dataToSend,
      },
      { new: true }
    );
    if (req.file) {
      updData.profilepic = {
        contentType: req.file.mimetpe,
        data: req.file.buffer,
      };
    }

    await updData.save();

    res.redirect("/admin/viewTeacher");
  } catch (err) {
    console.log(err);
  }
};

//
exports.deleteTeacher = async (req, res) => {
  const userID = req.params.id;
  await teacherRegister.findOneAndDelete({ _id: userID });

  console.log(`Teacher User deleted`);

  res.redirect("/admin/viewTeacher");
};
