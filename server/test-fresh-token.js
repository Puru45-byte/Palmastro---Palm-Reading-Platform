require('dotenv').config();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const http = require('http');

async function testWithFreshToken() {
  try {
    console.log('Creating fresh token...');
    
    // Get the user
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('User found:', user.id);
    
    // Create fresh token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Fresh token created');
    
    // Test payment with fresh token
    const postData = JSON.stringify({});

    const options = {
      hostname: 'localhost',
      port: 5002,
      path: '/api/payments/create-order',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${token}`
      }
    };

    console.log('Making payment request...');

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
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testWithFreshToken();
