exports.viewTeacherDetails = async (req, res) => {
  try {

    res.render("detail_salary");
  } catch (error) {
    console.error(error);
  }
};
