const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");

require("../../db/connection/connect");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register student
exports.register_student = async (req, res) => {
  try {
    const stdRegister = new studentRegister({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      telephone: req.body.telephone,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
      },
      rollno: req.body.rollno,
      fees: req.body.fees,
      course: req.body.course,
      joiningdate: req.body.joiningdate || undefined,
      dob: req.body.dob,
      profilepic: req.body.profilepic,
    });
    if (req.file) {
      stdRegister.profilepic = {
        contentType: req.file.mimetype,
        data: req.file.buffer,
      };
    }

    await stdRegister
      .save()
      .then(() => {
        console.log("Successful Registration of a Student");
      })
      .catch((error) => {
        console.log(`save error:  ${error}`);
      });

    res.status(201).redirect("/admin/addStudent");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

// register teacher
exports.register_teacher = async (req, res) => {
  try {
    const stdRegister = new teacherRegister({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      telephone: req.body.telephone,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
      },
      teacherid: req.body.teacherid,
      salary: req.body.salary,
      teachingcourse: req.body.teachingcourse,
      joiningdate: req.body.joiningdate || undefined,
      dob: req.body.dob,
      profilepic: req.body.profilepic,
    });
    if (req.file) {
      stdRegister.profilepic = {
        contentType: req.file.mimetype,
        data: req.file.buffer,
      };
    }

    await stdRegister
      .save()
      .then(() => {
        console.log("Successful Registration of a Teacher");
      })
      .catch((error) => {
        console.log(`save error:  ${error}`);
      });
    res.status(201).redirect("/admin/addTeacher");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
