require('dotenv').config();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

async function testAuth() {
  try {
    console.log('Testing authentication...');
    
    // Create a test token
    const testUserId = 'test-user-id';
    const token = jwt.sign(
      { userId: testUserId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Test token created:', token);
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified:', decoded);
    
    // Check if user exists in database
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (user) {
      console.log('User found:', user.id, user.email);
    } else {
      console.log('User not found');
    }
    
  } catch (error) {
    console.error('Auth error:', error.message);
  }
}

testAuth();
