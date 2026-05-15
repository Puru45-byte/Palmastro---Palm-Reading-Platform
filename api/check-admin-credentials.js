const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAdminCredentials() {
  console.log('🔍 Checking Admin Credentials...\n');
  
  try {
    // Check all users in database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        createdAt: true
      }
    });
    
    console.log('📋 All Users in Database:');
    users.forEach(user => {
      console.log(`├─ Email: ${user.email}`);
      console.log(`│  Role: ${user.role}`);
      console.log(`│  Name: ${user.firstName} ${user.lastName}`);
      console.log(`│  ID: ${user.id}`);
      console.log(`│  Created: ${user.createdAt}`);
      console.log('├─────────────────────────');
    });
    
    // Find admin users
    const adminUsers = users.filter(user => user.role === 'ADMIN');
    
    if (adminUsers.length > 0) {
      console.log('\n👑 Admin Users Found:');
      adminUsers.forEach(admin => {
        console.log(`📧 Email: ${admin.email}`);
        console.log(`👤 Name: ${admin.firstName} ${admin.lastName}`);
        console.log(`🆔 ID: ${admin.id}`);
      });
      
      console.log('\n🔑 Admin Login Credentials:');
      console.log('📧 Email: ' + adminUsers[0].email);
      console.log('🔒 Password: Check your seed script or initial setup');
    } else {
      console.log('\n❌ No admin users found in database');
      console.log('💡 You may need to run the seed script');
    }
    
  } catch (error) {
    console.error('❌ Error checking admin credentials:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminCredentials();
