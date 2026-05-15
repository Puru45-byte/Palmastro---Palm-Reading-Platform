const http = require('http');

// First, get a token for the test user
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
      // Now test the orders API
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

      ordersReq.on('error', (e) => {
        console.error('Orders API error:', e.message);
      });

      ordersReq.end();
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
