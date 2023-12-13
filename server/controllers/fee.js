const courseModel = require("../../db/models/courseSchema");
const feeModel = require("../../db/models/feeSchema");
const { studentRegister } = require("../../db/models/studentSchema");

// FEE OF STUDENT IS ADDED WHILE REGISTERING STUDENT SIMULTEOUSLY BY SAME FORM
exports.viewFee = async (req, res) => {
  try {
    const courseAvailable = await courseModel.find({}, "courseName");

    res.render("fee", { courseAvailable });
  } catch (error) {
    console.error(error);
  }
};

exports.viewStudentDetails = async (req, res) => {
  const courseID = req.params.courseID;
  try {
    const feeData = await feeModel
      .find({ course: courseID })
      .populate("student");

    res.render("detail_fee", { feeData });
  } catch (error) {
    console.error(error);
  }
};
