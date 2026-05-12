require('dotenv').config();
const axios = require('axios');

async function testRazorpayFinal() {
  try {
    console.log('=== FINAL RAZORPAY INTEGRATION TEST ===');
    console.log('Environment check:');
    console.log('- RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? 'SET' : 'NOT SET');
    console.log('- RAZORPAY_SECRET:', process.env.RAZORPAY_SECRET ? 'SET' : 'NOT SET');
    console.log('- PORT:', process.env.PORT || 'DEFAULT');
    
    // Test server health
    console.log('\n1. Testing server health...');
    const healthResponse = await axios.get('http://localhost:5001/api/health');
    console.log('Server health:', healthResponse.data);
    
    // Test user registration or login
    console.log('\n2. Testing user authentication...');
    let token;
    try {
      const registerResponse = await axios.post('http://localhost:5001/api/auth/register', {
        firstName: 'Final',
        lastName: 'Test',
        email: 'finaltest@example.com',
        password: 'password123'
      });
      console.log('Registration status:', registerResponse.status);
      token = registerResponse.data.token;
    } catch (regError) {
      console.log('User exists, trying login...');
      const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
        email: 'finaltest@example.com',
        password: 'password123'
      });
      console.log('Login status:', loginResponse.status);
      token = loginResponse.data.token;
    }
    
    console.log('Token received:', token ? 'YES' : 'NO');
    
    // Test payment order creation
    console.log('\n3. Testing payment order creation...');
    const paymentResponse = await axios.post('http://localhost:5001/api/payments/create-order', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Payment order status:', paymentResponse.status);
    console.log('Payment order data:', paymentResponse.data);
    
    // Verify order structure
    const order = paymentResponse.data;
    if (order.id && order.amount && order.currency) {
      console.log('\n=== SUCCESS: Razorpay integration working! ===');
      console.log('Order ID:', order.id);
      console.log('Amount:', order.amount);
      console.log('Currency:', order.currency);
      console.log('Status:', order.status || 'created');
    } else {
      console.log('\n=== ERROR: Invalid order structure ===');
      console.log('Order received:', order);
    }
    
  } catch (error) {
    console.error('\n=== TEST FAILED ===');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testRazorpayFinal();
