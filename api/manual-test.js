require('dotenv').config();
const http = require('http');

const postData = JSON.stringify({});

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/payments/create-order',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbW80bzZla2swMDAwbGxqc2hhOG91dTl3IiwiaWF0IjoxNzc2NTM2ODgxLCJleHAiOjE3NzcxNDE2ODF9.7bEzf7dDwr6nkiVWx4dXtQ1WPBlEsvxdRQxKlEeh-9U'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
