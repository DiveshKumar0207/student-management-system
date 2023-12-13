// middleware.js

const accountName = (req, res, next) => {
  // Set common data for the sidebar

  res.locals.userName = req.user ? req.user.firstname : null;

  next();
};

module.exports = accountName;
