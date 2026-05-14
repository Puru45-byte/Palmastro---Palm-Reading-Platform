require('dotenv').config();

async function debugUserData() {
  console.log('🔍 Debugging User Data Issue...\n');

  try {
    // Step 1: Test login response
    console.log('1️⃣ Testing Login Response...');
    const loginResponse = await fetch('http://localhost:5003/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response User Data:', JSON.stringify(loginData.user, null, 2));
    
    if (!loginResponse.ok) {
      console.log('❌ Login failed');
      return;
    }
    
    const token = loginData.token;
    
    // Step 2: Test profile response
    console.log('\n2️⃣ Testing Profile Response...');
    const profileResponse = await fetch('http://localhost:5003/api/profile/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profileData = await profileResponse.json();
    console.log('Profile Response Data:', JSON.stringify(profileData, null, 2));
    
    // Step 3: Check database directly
    console.log('\n3️⃣ Checking Database Directly...');
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const dbUser = await prisma.user.findUnique({
      where: { email: 'test@palmastro.com' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        createdAt: true
      }
    });
    
    console.log('Database User Data:', JSON.stringify(dbUser, null, 2));
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugUserData();
