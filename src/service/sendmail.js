require("dotenv").config();
const nodemailer = require("nodemailer");
const { RESPONSE_CODE } = require("../constant");

const { EMAIL, PASSWORD } = process.env;

const sendMailToStudent = async (req, res) => {
  const { content, subject, receiveMail } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  // step 2
  let mailOptions = {
    from: "tranvansu2001@gmail.com",
    to: receiveMail,
    subject: subject,
    text: content,
  };

  // step 3:
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("something wrong: ", err);
    } else {
      console.log("mail sent");
    }
  });

  res.send({
    code: RESPONSE_CODE.SUCCESS,
    // message: "Send mail to student successful",
    message: content + " " + subject + " " + receiveMail,
  });
};

module.exports = {
  sendMailToStudent,
};
