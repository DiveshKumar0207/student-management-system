require("../../db/connection/connect");
const noticeRegister = require("../../db/models/noticeSchema");
const otpSendEmail = require("../../utils/sendEmail");
const { studentRegister } = require("../../db/models/studentSchema");
const { teacherRegister } = require("../../db/models/teacherSchema");
const { adminRegister } = require("../../db/models/adminSchema");

function mailOptionsFn(message, recipientEmails, subject) {
  let mailOptions = {
    from: "your-email@gmail.com",
    to: "", // Or any placeholder email
    bcc: recipientEmails, // BCC hides recipients
    subject: `${subject}`,
    text: `${message}`,
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>

                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                        margin: 0;
                        padding: 0;
                    }
                  
                    .container {
                        background-color: #ffffff;
                        width: 600px;
                        margin: 50px auto;
                        padding: 30px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                  
                    .logo {
                        max-width: 100px;
                        margin: 0 auto;
                        display: block;
                        padding: 20px 0;
                    }
                  
                    h1 {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                  
                    p {
                        text-align: center;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                  
                    .otp {
                        background-color: #007BFF;
                        color: #ffffff;
                        font-size: 24px;
                        padding: 10px 20px;
                        margin: 20px auto;
                        display: block;
                        width: 150px;
                        text-align: center;
                        border-radius: 5px;
                    }
                  
                    .validity {
                        font-size: 14px;
                        text-align: center;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container"> 
                    <p class="otp">${message}</p>    
                </div>
            </body>
            </html>`,
  };

  return mailOptions;
}

async function getAllEmails() {
  try {
    const [emails1, emails2, emails3] = await Promise.all([
      adminRegister.find({}, { email: 1, _id: 0 }),
      studentRegister.find({}, { email: 1, _id: 0 }),
      teacherRegister.find({}, { email: 1, _id: 0 }),
    ]);

    const allEmails = [
      ...emails1.map((user) => user.email),
      ...emails2.map((user) => user.email),
      ...emails3.map((user) => user.email),
    ];

    return allEmails;
  } catch (error) {
    console.log(error);
  }
}

exports.noticePage = (req, res) => {
  res.render("notice");
};

exports.postNotice = async (req, res) => {
  const { noticeHead, notice, expireAt } = req.body;

  const expiration = new Date(expireAt);

  try {
    const postNotice = new noticeRegister({
      noticeHead,
      notice,
      expireAt: expiration,
    });

    await postNotice.save();

    const recipientEmails = await getAllEmails();
    const subject = noticeHead;
    const message = notice;

    const mailOptions = mailOptionsFn(message, recipientEmails, subject);
    otpSendEmail(mailOptions)
      .then(() => {
        console.log("Notice mails sent to all mails");
      })
      .catch((error) => console.log(error));

    res.redirect("/admin/notice");
  } catch (err) {
    console.log(err);
  }
};
