const prisma = require('./utils/prisma');

async function testAdminUser() {
  try {
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@gmail.com' },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true
      }
    });
    
    if (adminUser) {
      console.log('✅ Admin user found:');
      console.log('ID:', adminUser.id);
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Name:', `${adminUser.firstName} ${adminUser.lastName}`);
    } else {
      console.log('❌ Admin user not found');
    }
  } catch (error) {
    console.error('❌ Error checking admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAdminUser();
