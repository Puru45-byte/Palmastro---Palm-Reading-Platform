const bcrypt = require('bcrypt');
const prisma = require('./utils/prisma');

async function createAdminUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('1234', 10);
    
    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@gmail.com');
    console.log('Password: 1234');
    console.log('Role: ADMIN');
    console.log('User ID:', adminUser.id);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('❌ Admin user already exists');
    } else {
      console.error('❌ Error creating admin user:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
