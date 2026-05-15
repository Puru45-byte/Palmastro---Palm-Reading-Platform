require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

async function testPaymentReal() {
  try {
    console.log('Testing payment with real user...');
    
    // Get the real user
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (!user) {
      console.log('User not found, creating...');
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      const newUser = await prisma.user.create({
        data: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: hashedPassword
        }
      });
      
      console.log('User created:', newUser.id);
    }
    
    // Create token for the user
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('Using token for user:', user.id);
    
    // Test payment with real user token
    const paymentResponse = await axios.post('http://localhost:5001/api/payments/create-order', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Payment order created successfully!');
    console.log('Response:', paymentResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testPaymentReal();
