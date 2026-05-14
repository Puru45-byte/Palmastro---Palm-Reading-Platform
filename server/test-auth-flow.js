require('dotenv').config();

console.log('🧪 Testing Complete Authentication Flow...\n');

async function testAuthFlow() {
  try {
    // Step 1: Login (same as frontend)
    console.log('1️⃣ Testing login...');
    const loginResponse = await fetch('http://localhost:5003/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    
    if (!loginResponse.ok) {
      console.log('❌ Login failed:', await loginResponse.text());
      return;
    }
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful!');
    console.log('Token received:', loginData.token ? 'YES' : 'NO');
    
    const token = loginData.token;
    
    // Step 2: Test profile endpoint WITH token (same as frontend)
    console.log('\n2️⃣ Testing /api/profile/me WITH token...');
    const profileResponse = await fetch('http://localhost:5003/api/profile/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Profile response status:', profileResponse.status);
    
    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      console.log('✅ Profile data received:');
      console.log('  First Name:', profileData.firstName);
      console.log('  Last Name:', profileData.lastName);
      console.log('  Email:', profileData.email);
    } else {
      const errorText = await profileResponse.text();
      console.log('❌ Profile failed:', errorText);
    }
    
    // Step 3: Test readings endpoint WITH token
    console.log('\n3️⃣ Testing /api/readings/my-readings WITH token...');
    const readingsResponse = await fetch('http://localhost:5003/api/readings/my-readings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Readings response status:', readingsResponse.status);
    
    if (readingsResponse.ok) {
      const readingsData = await readingsResponse.json();
      console.log('✅ Readings data received:', readingsData.length, 'items');
    } else {
      const errorText = await readingsResponse.text();
      console.log('❌ Readings failed:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuthFlow();
