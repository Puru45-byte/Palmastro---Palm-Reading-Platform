const bcrypt = require('bcryptjs');
const prisma = require('./utils/prisma');

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const user = await prisma.user.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: hashedPassword,
        phone: '1234567890',
        role: 'USER'
      }
    });
    
    console.log('✅ Test user created successfully!');
    console.log('Email:', user.email);
    console.log('ID:', user.id);
    console.log('Phone:', user.phone);
    console.log('Date of Birth:', user.dateOfBirth);
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
