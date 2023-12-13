exports.errorPage = (req, res) => {
  res.status(404);
  res.render("errorPage");
};
