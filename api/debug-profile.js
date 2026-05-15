require('dotenv').config();

async function debugProfile() {
  console.log('🔍 Debugging Profile Update...\n');

  try {
    // Test 1: Login
    console.log('1️⃣ Testing login...');
    const loginResponse = await fetch('http://localhost:5003/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    
    if (!loginResponse.ok) {
      console.log('❌ Login failed');
      return;
    }
    
    const token = loginData.token;
    
    // Test 2: Get profile
    console.log('\n2️⃣ Testing GET profile...');
    const profileResponse = await fetch('http://localhost:5003/api/profile/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profileData = await profileResponse.json();
    console.log('GET Profile Response:', profileData);
    
    // Test 3: Update firstName
    console.log('\n3️⃣ Testing PUT firstName...');
    const updateResponse = await fetch('http://localhost:5003/api/profile/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: 'John'
      })
    });
    
    const updateData = await updateResponse.json();
    console.log('PUT Response Status:', updateResponse.status);
    console.log('PUT Response Data:', updateData);
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugProfile();
