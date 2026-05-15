const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const getEmailTemplate = (userQuestion, adminAnswer) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Palm Reading Answer</title>
</head>

<body style="margin:0; padding:0; background:#f8f4ee; font-family:Georgia, serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
<tr>
<td align="center">

<!-- Main Card -->
<table width="600" cellpadding="0" cellspacing="0"
style="
background:#fffaf3;
border-radius:24px;
padding:40px;
border:1px solid #eadcc6;
box-shadow:0 10px 30px rgba(0,0,0,0.06);
">

<!-- Logo -->
<tr>
<td align="center">

<h1 style="
margin:0;
font-size:38px;
color:#2d1457;
font-weight:600;
">
Your Palm Reading Answer
</h1>

<p style="
margin-top:10px;
font-size:18px;
color:#7d6b5c;
line-height:28px;
">
The secrets written in your hands are revealed ✨
</p>

</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:30px 0;">
<hr style="border:none; border-top:1px solid #eadcc6;">
</td>
</tr>

<!-- User Question -->
<tr>
<td>

<p style="
font-size:20px;
color:#2d1457;
font-weight:bold;
margin-bottom:10px;
">
🔮 Your Question
</p>

<div style="
background:#f8efe3;
padding:20px;
border-radius:16px;
font-size:17px;
color:#5c4d42;
line-height:30px;
border:1px solid #e6d4bc;
">
${userQuestion}
</div>

</td>
</tr>

<!-- Space -->
<tr>
<td style="height:30px;"></td>
</tr>

<!-- Personalized Answer -->
<tr>
<td>

<p style="
font-size:20px;
color:#2d1457;
font-weight:bold;
margin-bottom:10px;
">
✨ Your Personalized Reading
</p>

<div style="
background:#fff;
padding:25px;
border-radius:16px;
border:1px solid #eadcc6;
font-size:18px;
color:#4b3f35;
line-height:34px;
">
${adminAnswer}
</div>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="padding-top:40px;">

<p style="
font-size:15px;
color:#8c7b6b;
line-height:26px;
margin:0;
">
Thank you for trusting our spiritual guidance 🌙
</p>

<p style="
font-size:14px;
color:#b39a7d;
margin-top:8px;
">
© 2026 Palmistry. All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
};

const sendAnswerEmail = async (userEmail, userQuestion, adminAnswer) => {
  try {
    const htmlContent = getEmailTemplate(userQuestion, adminAnswer);
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Your Palm Reading Answer',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully with HTML template');
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = { sendAnswerEmail };
