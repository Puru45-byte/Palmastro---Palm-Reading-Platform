const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const getContactEmailTemplate = (formData) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>New Contact Message</title>
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

<!-- Header -->
<tr>
<td align="center">

<h1 style="
margin:0;
font-size:38px;
color:#2d1457;
font-weight:600;
">
📧 New Contact Message
</h1>

<p style="
margin-top:10px;
font-size:18px;
color:#7d6b5c;
line-height:28px;
">
Someone has reached out through your contact form
</p>

</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:30px 0;">
<hr style="border:none; border-top:1px solid #eadcc6;">
</td>
</tr>

<!-- Contact Details -->
<tr>
<td>

<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">

<tr>
<td style="padding: 15px; background: #f8efe3; border-radius: 12px 12px 0 0;">
<p style="
font-size:20px;
color:#2d1457;
font-weight:bold;
margin:0;
">
👤 Sender Information
</p>
</td>
</tr>

<tr>
<td style="padding: 20px; background: #fff; border-left: 1px solid #eadcc6; border-right: 1px solid #eadcc6;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td width="120" style="font-size:16px; color:#7d6b5c; font-weight:500; padding: 8px 0;">Name:</td>
<td style="font-size:16px; color:#2d1457; padding: 8px 0;"><strong>${formData.name}</strong></td>
</tr>
<tr>
<td style="font-size:16px; color:#7d6b5c; font-weight:500; padding: 8px 0;">Email:</td>
<td style="font-size:16px; color:#2d1457; padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #4A3B8A;">${formData.email}</a></td>
</tr>
<tr>
<td style="font-size:16px; color:#7d6b5c; font-weight:500; padding: 8px 0;">Subject:</td>
<td style="font-size:16px; color:#2d1457; padding: 8px 0;"><strong>${formData.subject}</strong></td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding: 20px; background: #fff; border-left: 1px solid #eadcc6; border-right: 1px solid #eadcc6;">
<p style="
font-size:20px;
color:#2d1457;
font-weight:bold;
margin:0 0 15px 0;
">
💬 Message
</p>
<div style="
background:#f8efe3;
padding:20px;
border-radius:12px;
font-size:16px;
color:#5c4d42;
line-height:28px;
border:1px solid #e6d4bc;
">
${formData.message.replace(/\n/g, '<br>')}
</div>
</td>
</tr>

<tr>
<td style="padding: 15px; background: #f8efe3; border-radius: 0 0 12px 12px; border-left: 1px solid #eadcc6; border-right: 1px solid #eadcc6; border-bottom: 1px solid #eadcc6;">
<p style="font-size:14px; color:#8c7b6b; margin:0; text-align: center;">
💡 Tip: You can reply directly to this email to contact the user
</p>
</td>
</tr>

</table>

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
This message was sent from your Palmastro contact form
</p>

<p style="
font-size:14px;
color:#b39a7d;
margin-top:8px;
">
© 2026 Aegis Palmistry. All Rights Reserved.
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

router.post('/send-message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email address' 
      });
    }

    const htmlContent = getContactEmailTemplate({ name, email, subject, message });
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.CONTACT_RECEIVER_EMAIL || 'aniketpathrabe@zohomail.in', // Send to configured receiver
      replyTo: email, // Allow direct reply to user
      subject: `New Contact Message: ${subject}`,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`Contact message sent from ${email}: ${subject}`);
    
    res.json({ 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again.' 
    });
  }
});

module.exports = router;
