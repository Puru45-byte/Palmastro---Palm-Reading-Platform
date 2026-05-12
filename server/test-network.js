require('dotenv').config();

async function testNetwork() {
  try {
    console.log('Testing network connectivity...');
    
    // Test basic HTTP connection
    const http = require('http');
    
    const testData = {
      amount: 14900,
      currency: 'INR',
      receipt: 'test_network',
      payment_capture: 1
    };
    
    // Make direct HTTP request to Razorpay API
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'api.razorpay.com',
      port: 443,
      path: '/v1/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`).toString('base64')}`
      }
    };

    console.log('Making direct HTTP request to Razorpay...');
    
    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      
      res.on('data', (chunk) => {
        console.log(`Response: ${chunk}`);
      });
    });

    req.on('error', (e) => {
      console.error(`Request error: ${e.message}`);
    });

    req.write(postData);
    req.end();
    
  } catch (error) {
    console.error('Network test error:', error.message);
  }
}

testNetwork();
