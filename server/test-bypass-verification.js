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
      // Now test payment verification with bypassed signature
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
          
          // Now check if order appears in orders
          if (response.success) {
            const ordersOptions = {
              hostname: 'localhost',
              port: 5002,
              path: '/api/orders/my-orders',
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${loginResponse.token}`
              }
            };

            const ordersReq = http.request(ordersOptions, (ordersRes) => {
              console.log(`Orders API Status: ${ordersRes.statusCode}`);
              
              let ordersData = '';
              ordersRes.on('data', (chunk) => {
                ordersData += chunk;
              });
              
              ordersRes.on('end', () => {
                console.log('Orders Response:', ordersData);
                const orders = JSON.parse(ordersData);
                console.log(`Found ${orders.length} orders`);
                if (orders.length > 0) {
                  console.log('Latest order question:', orders[0].question);
                  console.log('Latest order status:', orders[0].status);
                }
              });
            });

            ordersReq.end();
          }
        });
      });

      // Test data that would bypass signature verification temporarily
      const testPaymentData = {
        razorpay_order_id: 'order_test_bypass',
        razorpay_payment_id: 'pay_test_bypass',
        razorpay_signature: 'bypass_signature_for_testing',
        formData: JSON.stringify({
          question: 'Test question about career path - SUCCESS!',
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
