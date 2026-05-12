const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendAnswerEmail = async (userEmail, answer) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Your Palm Reading Answer',
      text: answer
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = { sendAnswerEmail };
