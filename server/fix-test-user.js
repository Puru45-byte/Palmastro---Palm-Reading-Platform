const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixTestUser() {
  try {
    await prisma.user.update({
      where: { email: 'test@palmastro.com' },
      data: { 
        firstName: 'Test',
        lastName: 'User'
      }
    });
    
    console.log('✅ Fixed test user: firstName = "Test", lastName = "User"');
    
    const user = await prisma.user.findUnique({
      where: { email: 'test@palmastro.com' },
      select: { firstName: true, lastName: true, email: true }
    });
    
    console.log('Updated user data:', user);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixTestUser();
