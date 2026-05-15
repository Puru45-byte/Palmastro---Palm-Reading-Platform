require('dotenv').config();
const axios = require('axios');

async function testPaymentDebug() {
  try {
    console.log('=== Testing Payment Debug ===');
    
    // First register/login to get token
    const registerResponse = await axios.post('http://localhost:5001/api/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: 'test123@example.com',
      password: 'password123'
    });
    
    console.log('Register response:', registerResponse.status);
    console.log('Register data:', registerResponse.data);
    
    if (registerResponse.data.token) {
      const token = registerResponse.data.token;
      console.log('Token received, testing payment...');
      
      // Test payment
      const paymentResponse = await axios.post('http://localhost:5001/api/payments/create-order', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Payment response status:', paymentResponse.status);
      console.log('Payment response data:', paymentResponse.data);
      console.log('Payment response headers:', paymentResponse.headers);
      
    } else {
      console.log('No token received');
    }
    
  } catch (error) {
    console.error('Test error:', error.message);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    }
  }
}

testPaymentDebug();
