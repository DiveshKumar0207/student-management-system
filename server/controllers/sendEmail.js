const nodemailer = require("nodemailer");

async function createTestAccountAndSendEmail(otp, recipientEmail) {
  try {
    // Create a testing account
    // const testAccount = await nodemailer.createTestAccount();

    // console.log("Testing account created");
    // console.log("Email: " + testAccount.user);
    // console.log("Password: " + testAccount.pass);

    // const transporter = nodemailer.createTransport({
    //   host: testAccount.smtp.host,
    //   port: testAccount.smtp.port,
    //   secure: false, // false for TLS; true for SSL
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

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

    // Message object
    let message = {
      from: "your-email@gmail.com",
      to: recipientEmail,
      subject: "Reset otp",
      text: `
        Your One-Time Password (OTP)

        Dear User,

        Your OTP code for secure access is: ${otp}

        Please use this code to complete your action. This code will expire in 5 minutes.

        If you did not request this OTP, please ignore this email.
      `,
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
                      <img src="https://via.placeholder.com/100x50" alt="Logo" class="logo">
                      <h1>Your One Time Password (OTP)</h1>
                      <p class="otp">${otp}</p>
                      <p class="validity">Please enter this OTP within 10 minutes to verify your identity.</p>
                  </div>
              </body>
              </html>`,
    };

    // Send the email
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);

    // Preview URL is only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error(
      "Failed to create a testing account or send the email. " + err.message
    );
  }
}

module.exports = createTestAccountAndSendEmail;
