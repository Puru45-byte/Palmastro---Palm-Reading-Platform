require('dotenv').config();
const axios = require('axios');

async function finalTest() {
  try {
    console.log('=== FINAL TEST - PAYMENT ISSUE FIXED ===');
    
    // Test health
    const health = await axios.get('http://localhost:5002/api/health');
    console.log('Server health:', health.data);
    
    // Test login
    const login = await axios.post('http://localhost:5002/api/auth/login', {
      email: 'finaltest@example.com',
      password: 'password123'
    });
    console.log('Login successful:', login.status);
    
    // Test payment
    const payment = await axios.post('http://localhost:5002/api/payments/create-order', {}, {
      headers: {
        'Authorization': `Bearer ${login.data.token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('=== SUCCESS! PAYMENT WORKING ===');
    console.log('Payment status:', payment.status);
    console.log('Order ID:', payment.data.id);
    console.log('Amount:', payment.data.amount);
    console.log('Status:', payment.data.status);
    
  } catch (error) {
    console.error('=== FINAL TEST RESULT ===');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

finalTest();
