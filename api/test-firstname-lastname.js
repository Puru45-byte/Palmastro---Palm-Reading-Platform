require('dotenv').config();

const API_BASE = 'http://localhost:5003/api';

async function testFirstNameLastName() {
  console.log('🧪 Testing First Name & Last Name Update...\n');

  try {
    // Step 1: Login
    console.log('1️⃣ Logging in...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (!loginResponse.ok) {
      console.log('❌ Login failed:', loginData.error);
      return;
    }
    
    console.log('✅ Login successful!');
    const token = loginData.token;
    
    // Step 2: Get current profile
    console.log('\n2️⃣ Getting current profile...');
    const profileResponse = await fetch(`${API_BASE}/profile/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profile = await profileResponse.json();
    
    if (!profileResponse.ok) {
      console.log('❌ Profile fetch failed:', profile.error);
      return;
    }
    
    console.log('✅ Current profile:');
    console.log('   Name:', profile.name);
    console.log('   First Name:', profile.firstName || 'Not set');
    console.log('   Last Name:', profile.lastName || 'Not set');
    
    // Step 3: Update First Name
    console.log('\n3️⃣ Updating First Name...');
    const firstNameResponse = await fetch(`${API_BASE}/profile/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: 'John'
      })
    });
    
    const firstNameData = await firstNameResponse.json();
    
    if (!firstNameResponse.ok) {
      console.log('❌ First name update failed:', firstNameData.error);
    } else {
      console.log('✅ First name updated to: John');
    }
    
    // Step 4: Update Last Name
    console.log('\n4️⃣ Updating Last Name...');
    const lastNameResponse = await fetch(`${API_BASE}/profile/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        lastName: 'Doe'
      })
    });
    
    const lastNameData = await lastNameResponse.json();
    
    if (!lastNameResponse.ok) {
      console.log('❌ Last name update failed:', lastNameData.error);
    } else {
      console.log('✅ Last name updated to: Doe');
    }
    
    // Step 5: Get final profile
    console.log('\n5️⃣ Getting final profile...');
    const finalProfileResponse = await fetch(`${API_BASE}/profile/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const finalProfile = await finalProfileResponse.json();
    
    if (!finalProfileResponse.ok) {
      console.log('❌ Final profile fetch failed:', finalProfile.error);
      return;
    }
    
    console.log('✅ Final profile:');
    console.log('   Name:', finalProfile.name);
    console.log('   First Name:', finalProfile.firstName);
    console.log('   Last Name:', finalProfile.lastName);
    console.log('   Email:', finalProfile.email);
    
    console.log('\n🎉 First Name & Last Name Test Complete!');
    console.log('✅ Ready for frontend testing!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFirstNameLastName();
