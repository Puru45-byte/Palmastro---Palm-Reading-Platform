require('dotenv').config();
const Razorpay = require('razorpay');

async function testRazorpayAPI() {
  try {
    console.log('=== RAZORPAY API DIRECT TEST ===');
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });
    
    console.log('Razorpay instance created');
    console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
    console.log('Key Secret set:', !!process.env.RAZORPAY_SECRET);
    
    // Test order creation
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`,
      payment_capture: 1
    };
    
    console.log('Creating order with options:', options);
    
    const order = await razorpay.orders.create(options);
    
    console.log('=== SUCCESS: Razorpay API working! ===');
    console.log('Order ID:', order.id);
    console.log('Amount:', order.amount);
    console.log('Currency:', order.currency);
    console.log('Status:', order.status);
    console.log('Receipt:', order.receipt);
    
  } catch (error) {
    console.error('=== RAZORPAY API ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error description:', error.description);
    console.error('Full error:', error);
    
    // Check if it's an authentication error
    if (error.message.includes('key_id') || error.message.includes('oauthToken')) {
      console.log('\n=== SOLUTION ===');
      console.log('This is an authentication error. Check your Razorpay credentials:');
      console.log('1. Go to https://dashboard.razorpay.com/');
      console.log('2. Ensure Test Mode is enabled');
      console.log('3. Copy the correct Key ID and Secret');
      console.log('4. Update your .env file with the correct credentials');
    }
  }
}

testRazorpayAPI();
