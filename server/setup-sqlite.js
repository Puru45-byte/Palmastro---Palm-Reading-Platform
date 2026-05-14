console.log('=== Setting up SQLite database ===');

// Modify the schema to use SQLite temporarily
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      provider: 'sqlite',
      url: 'file:./dev.db'
    }
  }
});

// Test the connection
async function testSQLite() {
  try {
    console.log('Testing SQLite connection...');
    
    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'test123',
        role: 'USER'
      }
    });
    
    console.log('✅ Test user created:', testUser.id);
    
    // Query the user
    const foundUser = await prisma.user.findUnique({
      where: { id: testUser.id }
    });
    
    console.log('✅ User found:', foundUser.email);
    console.log('✅ SQLite connection SUCCESSFUL');
    
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('❌ SQLite connection FAILED:', error.message);
    return false;
  }
}

testSQLite();
