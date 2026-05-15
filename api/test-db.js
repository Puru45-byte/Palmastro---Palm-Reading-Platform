require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testDB() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    const count = await prisma.user.count();
    console.log(`✅ Found ${count} users in database`);
    
    await prisma.$disconnect();
    console.log('✅ Database test completed');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  }
}

testDB();
