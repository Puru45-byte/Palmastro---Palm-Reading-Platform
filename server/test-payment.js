require('dotenv').config();
const axios = require('axios');

async function testPayment() {
  try {
    console.log('Testing payment endpoint...');
    
    // First register a user
    const registerResponse = await axios.post('http://localhost:5001/api/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = registerResponse.data.token;
    console.log('User registered, token received');
    
    // Now test payment
    const paymentResponse = await axios.post('http://localhost:5001/api/payments/create-order', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Payment order created successfully:', paymentResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testPayment();
