const studentfee = require("../../db/models/feeSchema");
const { studentRegister } = require("../../db/models/studentSchema");

// FEE OF STUDENT IS ADDED WHILE REGISTERING STUDENT SIMULTEOUSLY BY SAME FORM
exports.viewFee = async (req, res) => {
  try {
    // const feeData = await studentRegister.find({}, "course");
    // console.log("fee data: ", feeData);

    res.render("fee");
  } catch (error) {
    console.error(error);
  }
};

exports.viewStudentDetails = async (req, res) => {
  try {
    // const feeData = await studentRegister.find({}, "course");
    // console.log("fee data: ", feeData);

    res.render("fee");
  } catch (error) {
    console.error(error);
  }
};
