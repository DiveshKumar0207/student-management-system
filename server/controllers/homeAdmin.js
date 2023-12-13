const noticeRegister = require("../../db/models/noticeSchema");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const feeModel = require("../../db/models/feeSchema");
require("../../db/connection/connect");

// let noticedisp = [];

exports.home = async (req, res) => {
  try {
    const noticedisp = await noticeRegister.find();
    const totalStudents = await studentRegister.find().count();
    const totalTeachers = await teacherRegister.find().count();
    const pendingFees = await feeModel.aggregate([
      {
        $match: {
          paymentstatus: { $in: ["Pending", "Failed"] },
        },
      },
      {
        $group: {
          _id: null,
          totalpendingfees: { $sum: "$amount" },
        },
      },
    ]);

    res.render("home", {
      noticedisp,
      totalStudents,
      totalTeachers,
      pendingFees,
    });
  } catch (err) {
    console.log(err);
  }
};
