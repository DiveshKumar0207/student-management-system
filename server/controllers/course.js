require("../../db/connection/connect");
const course = require("../../db/models/courseSchema");

let pageHeading;

// to render course page
exports.courses = async (req, res) => {
  try {
    const courseAvailable = await course.find();

    res.render("courses", { pageHeading, courseAvailable });
  } catch (err) {
    console.log(err);
  }
};

exports.addcoursePage = (req, res) => {
  pageHeading = "Add Course";

  res.render("add_course", { pageHeading });
};

// to create course
exports.createCourse = async (req, res) => {
  const { courseName, courseID, courseFee } = req.body;
  const register = new course({
    courseID,
    courseName,
    courseFee,
  });

  await register.save();

  res.redirect("admin/courses/addCourse");
};

//TODO -> NOTIFY BEFFORE DELETING COURSE OR STUDENT OR OTHER DATA
// to show course in form
exports.editCourse = async (req, res) => {
  const courseUpd = req.params.id;

  try {
    const updateDetail = await course.findOne({ _id: courseUpd });

    res.render("update_course", { updateDetail });
  } catch (err) {
    console.log(err);
  }
};

// to update course
exports.updateCourse = async (req, res) => {
  const courseUpd = req.params.id;
  const { courseName, courseID, courseFee } = req.body;

  try {
    const upddetails = await course.findOneAndUpdate(
      { _id: courseUpd },
      { courseName, courseID, courseFee },
      { new: true }
    );

    await upddetails.save();

    res.redirect("/admin/courses");
  } catch (err) {
    console.log(err);
  }
};

// to delete course
exports.deleteCourse = async (req, res) => {
  const courseDel = req.params.id;

  try {
    await course.findOneAndDelete({ _id: courseDel });

    console.log("course deletion");

    res.redirect("/admin/courses");
  } catch (err) {
    console.log(err);
  }
};
