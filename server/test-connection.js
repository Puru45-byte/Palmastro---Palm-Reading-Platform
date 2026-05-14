const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5003,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('✅ Server is responding!');
  console.log('Status:', res.statusCode);
  
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.log('❌ Server connection failed:', err.message);
});

req.end();
