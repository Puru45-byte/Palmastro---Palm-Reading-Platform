const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    const count = await prisma.user.count();
    console.log('Database connection successful! User count:', count);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();
