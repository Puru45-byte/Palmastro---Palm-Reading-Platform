require('dotenv').config();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

async function testImmediate() {
  try {
    // Get user and create token
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (!user) {
      console.log('User not found');
      return;
    }
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Token:', token);
    
    // Test immediately
    const { execSync } = require('child_process');
    const response = execSync(`curl.exe -X POST http://localhost:5002/api/payments/create-order -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" -d "{}"`, { encoding: 'utf8' });
    console.log('Response:', response);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testImmediate();
