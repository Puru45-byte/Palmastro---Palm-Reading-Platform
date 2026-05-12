require('dotenv').config();
const axios = require('axios');

async function testSimplePayment() {
  try {
    console.log('=== SIMPLE PAYMENT TEST ===');
    
    const response = await axios.post('http://localhost:5001/api/test-payment', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Success:', response.status);
    console.log('Order:', response.data);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testSimplePayment();
