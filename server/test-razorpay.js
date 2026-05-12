require('dotenv').config();
const Razorpay = require('razorpay');

async function testRazorpay() {
  try {
    console.log('Testing Razorpay directly...');
    console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
    console.log('Key Secret:', process.env.RAZORPAY_SECRET ? 'SET' : 'NOT SET');
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });
    
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: 'test_receipt_123',
      payment_capture: 1
    };
    
    console.log('Creating order...');
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order);
    
  } catch (error) {
    console.error('Razorpay error:', error.message);
    console.error('Full error:', error);
  }
}

testRazorpay();
