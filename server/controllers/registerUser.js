const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const feeModel = require("../../db/models/feeSchema");
const courseModel = require("../../db/models/courseSchema");

require("../../db/connection/connect");

require("dotenv").config();

//register student  // AND fee details of a student
exports.register_student = async (req, res) => {
  try {

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
      dob,
      profilepic,
      dueDate,
      feeDiscout,
    } = req.body;


    const courseTook = await courseModel.findOne({ courseName: course });

    const courseTookID = courseTook._id;

    const amount = courseTook.courseFee * parseInt(100- feeDiscout) / 100; //discounted fees

    const stdRegister = new studentRegister({
      firstname,
      lastname,
      gender,
      email,
      password,
      telephone,
      address: { street, city, state, pincode },
      rollno,
      joiningdate,
      dob,
      course: courseTookID,
      profilepic,
    });
    if (req.file) {
      stdRegister.profilepic = {
        contentType: req.file.mimetype,
        data: req.file.buffer,
      };
    }

    const newStudent = await stdRegister.save();

    const stdFee = new feeModel({
      student: newStudent._id,
      amount,
      course: courseTookID,
      dueDate,
    });

    await stdFee.save();

    res.status(201).redirect("/admin/addStudent");
  } catch (error) {

    console.error("Error registering student and creating fee data:", error);
    res.status(400).send(error);
  }
};


// register teacher
exports.register_teacher = async (req, res) => {
  try {
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

    const stdRegister = new teacherRegister({
      firstname,
      lastname,
      gender,
      email,
      password,
      telephone,
      address: {
        street,
        city,
        state,
        pincode,
      },
      teacherid,
      salary,
      teachingcourse: courseTookID,
      joiningdate,
      dob,
      profilepic,
    });
    if (req.file) {
      stdRegister.profilepic = {
        contentType: req.file.mimetype,
        data: req.file.buffer,
      };
    }

    await stdRegister.save();

    res.status(201).redirect("/admin/addTeacher");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
