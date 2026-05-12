require('dotenv').config();
const axios = require('axios');

async function testPaymentCurl() {
  try {
    console.log('=== PAYMENT CURL TEST ===');
    
    // Get token first
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'finaltest@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('Token received:', token ? 'YES' : 'NO');
    
    // Test payment with curl-like axios request
    const paymentResponse = await axios.post('http://localhost:5001/api/payments/create-order', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Payment success:', paymentResponse.status);
    console.log('Payment data:', paymentResponse.data);
    
  } catch (error) {
    console.error('Payment error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testPaymentCurl();
