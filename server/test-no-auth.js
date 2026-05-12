require('dotenv').config();
const axios = require('axios');

async function testNoAuth() {
  try {
    console.log('=== TEST PAYMENT WITHOUT AUTH ===');
    
    const response = await axios.post('http://localhost:5001/api/payments/create-order', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('=== SUCCESS! ===');
    console.log('Status:', response.status);
    console.log('Order:', response.data);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testNoAuth();
