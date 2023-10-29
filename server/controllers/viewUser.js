require("../../db/connection/connect");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const course = require("../../db/models/courseSchema");

// student
exports.viewStudent = async (req, res) => {
  try {
    const stdDbData = await studentRegister.find();

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
    const courseAvailable = await course.find();

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
    fees,
    course,
    joiningdate,
    dob,
  } = req.body;
  try {
    const updData = await studentRegister.findOneAndUpdate(
      { _id: userID },
      {
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
        fees,
        course,
        joiningdate,
        dob,
      },
      { new: true }
    );
    if (req.file) {
      updData.profilepic = {
        contentType: req.file.mimetpe,
        data: req.file.buffer,
      };
    }

    await updData
      .save()
      .then(() => {
        console.log("updated Student");
      })
      .catch((error) => {
        console.log(`save error:  ${error}`);
      });
    res.redirect("/admin/viewStudent");
  } catch (err) {
    console.log(err);
  }
};

// delete student
exports.deleteStudent = async (req, res) => {
  const userID = req.params.id;
  await studentRegister.findOneAndDelete({ _id: userID });
  console.log(`Student User deleted`);

  res.redirect("/admin/viewStudent");
};

//
// teacher
exports.viewTeacher = async (req, res) => {
  try {
    const stdDbData = await teacherRegister.find();

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
    const courseAvailable = await course.find();

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
  const userID = req.params.id;
  const {
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
    teachingcourse,
    salary,
    joiningdate,
    dob,
  } = req.body;
  try {
    const updData = await teacherRegister.findOneAndUpdate(
      { _id: userID },
      {
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
        teachingcourse,
        salary,
        joiningdate,
        dob,
      },
      { new: true }
    );
    if (req.file) {
      updData.profilepic = {
        contentType: req.file.mimetpe,
        data: req.file.buffer,
      };
    }

    await updData
      .save()
      .then(() => {
        console.log("updated Teacher");
      })
      .catch((error) => {
        console.log(`save error:  ${error}`);
      });
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
