const jwt = require("jsonwebtoken");
require("../../db/connection/connect");

exports.logout = async (req, res) => {
  // const refreshToken = req.cookies.jwtRefresh;

  // if (!refreshToken) {
  //   await res.clearCookie("jwtAccess");
  //   await res.clearCookie("jwtRefresh");
  //   res.status(401).json({ message: "unauthorized" });
  // }

  await res.clearCookie("jwtRefresh");


  // //   in middleware-:> we set req.user
  // const user = req.user;
  // if (!user) res.status(401).json({ message: "unauthorized" });

  //   console.log(req.user);

  //  deleting token by filtering it out
  // user.refreshtokens = user.refreshtokens.filter((token) => {
  //   return token !== refreshToken;
  // });
  // await user.save();
  // console.log(user.refreshtokens);

  //   clear coookies
  await res.clearCookie("jwtAccess");
  // await res.clearCookie("jwtRefresh");
  console.log("Log Out Successfully");
  res.status(201).redirect("/");
};
