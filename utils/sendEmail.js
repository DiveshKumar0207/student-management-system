const nodemailer = require("nodemailer");

async function createTestAccountAndSendEmail(mailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Failed to send the email. " + err.message);
  }
}

module.exports = createTestAccountAndSendEmail;
