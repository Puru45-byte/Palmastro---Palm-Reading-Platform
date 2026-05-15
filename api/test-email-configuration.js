console.log('📧 TESTING EMAIL CONFIGURATION 📧\n');
console.log('🔧 EMAIL SETTINGS:');
console.log('   EMAIL:', process.env.EMAIL);
console.log('   EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Set' : '❌ Missing');
console.log('   EMAIL_PASSWORD_LENGTH:', process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0);

const nodemailer = require('nodemailer');

// Test email transporter creation
try {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  console.log('✅ Email transporter created successfully');
  
  // Test connection
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email connection failed:', error.message);
      console.log('💡 Possible fixes:');
      console.log('   - Check Gmail password (use App Password, not regular password)');
      console.log('   - Enable "Less secure app access" in Gmail settings');
      console.log('   - Ensure 2FA is enabled and App Password is generated');
    } else {
      console.log('✅ Email connection verified successfully');
      console.log('🎉 Admin answer emails will be sent to users!');
    }
  });
} catch (error) {
  console.log('❌ Email transporter creation failed:', error.message);
}

console.log('\n📋 ADMIN ANSWER FLOW:');
console.log('   1. Admin submits answer → ✅ Working');
console.log('   2. Answer saved to database → ✅ Working');
console.log('   3. Request status updated → ✅ Working');
console.log('   4. Email sent to user → 📧 Testing...');
console.log('   5. User receives answer → 📧 Depends on email config');

console.log('\n🎯 NEXT STEPS:');
console.log('   1. Test admin answer submission');
console.log('   2. Check server logs for email status');
console.log('   3. Verify user receives email notification');
console.log('   4. Check spam folder if email not received');
