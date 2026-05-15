require('dotenv').config();
const Razorpay = require('razorpay');

async function testRazorpayDirect() {
  try {
    console.log('Testing Razorpay API connectivity...');
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });
    
    console.log('Razorpay instance created');
    console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
    console.log('Key Secret set:', !!process.env.RAZORPAY_SECRET);
    
    // Test with minimal options
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: 'test_receipt_direct',
      payment_capture: 1
    };
    
    console.log('Creating order with options:', options);
    
    const order = await razorpay.orders.create(options);
    
    console.log('✅ SUCCESS: Order created');
    console.log('Order ID:', order.id);
    console.log('Amount:', order.amount);
    console.log('Status:', order.status);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Error code:', error.code);
    console.error('Error description:', error.description);
    console.error('Full error:', error);
  }
}

testRazorpayDirect();
