const noticeRegister = require("../../db/models/noticeSchema");
require("../../db/connection/connect");

exports.notice = (req, res) => {
  const { noticeHead, notice, expireAt } = req.body;

  const expiration = new Date(expireAt);

  try {
    const postNotice = new noticeRegister({
      // noticeHead: noticeHead,
      // notice: notice,

      //  same entity and sent-data name->so can write like this also
      noticeHead,
      notice,
      expireAt: expiration,
    });

    postNotice
      .save()
      .then(() => {
        console.log(`notice added to db successfully`);
      })
      .catch((error) => {
        console.log(`posting notice failed : ${error}`);
      });
  } catch (err) {
    console.log(err);
  }
  res.redirect("/admin/notice");
};
