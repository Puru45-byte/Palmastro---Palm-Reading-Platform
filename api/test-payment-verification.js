const http = require('http');

// First login to get token
const loginOptions = {
  hostname: 'localhost',
  port: 5002,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const loginReq = http.request(loginOptions, (loginRes) => {
  let loginData = '';
  loginRes.on('data', (chunk) => {
    loginData += chunk;
  });
  
  loginRes.on('end', () => {
    const loginResponse = JSON.parse(loginData);
    console.log('Login successful, token:', loginResponse.token ? 'YES' : 'NO');
    
    if (loginResponse.token) {
      // Now test payment verification
      const verifyOptions = {
        hostname: 'localhost',
        port: 5002,
        path: '/api/payments/verify-payment',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginResponse.token}`
        }
      };

      const verifyReq = http.request(verifyOptions, (verifyRes) => {
        console.log(`Payment verification status: ${verifyRes.statusCode}`);
        
        let verifyData = '';
        verifyRes.on('data', (chunk) => {
          verifyData += chunk;
        });
        
        verifyRes.on('end', () => {
          console.log('Payment verification response:', verifyData);
          const response = JSON.parse(verifyData);
          console.log('Success:', response.success);
          console.log('Request ID:', response.requestId);
        });
      });

      verifyReq.on('error', (e) => {
        console.error('Payment verification error:', e.message);
      });

      // Test data that would come from Razorpay
      const testPaymentData = {
        razorpay_order_id: 'order_test_123',
        razorpay_payment_id: 'pay_test_123',
        razorpay_signature: 'test_signature_123',
        formData: JSON.stringify({
          question: 'Test question about career path',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        })
      };

      verifyReq.write(JSON.stringify(testPaymentData));
      verifyReq.end();
    }
  });
});

loginReq.on('error', (e) => {
  console.error('Login error:', e.message);
});

// Write login data
const loginData = JSON.stringify({
  email: 'john.doe@example.com',
  password: 'password123'
});

loginReq.write(loginData);
loginReq.end();
