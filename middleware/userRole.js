const role = (value) => {
  return (req, res, next) => {
    // from verifyJWt middleware
    const user = req.user;

    if (user.role === value) {
      next();
    } else res.status(403).json({ message: "restricted" });
  };
};

module.exports = role;
