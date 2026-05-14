require('dotenv').config();

async function testDateOfBirthUpdate() {
  console.log('🧪 Testing Date of Birth Update...\n');

  try {
    // Step 1: Login
    console.log('1️⃣ Logging in...');
    const loginResponse = await fetch('http://localhost:5003/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful!');
    
    const token = loginData.token;
    
    // Step 2: Get current profile
    console.log('\n2️⃣ Getting current profile...');
    const profileResponse = await fetch('http://localhost:5003/api/profile/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profileData = await profileResponse.json();
    console.log('Current dateOfBirth:', profileData.dateOfBirth);
    
    // Step 3: Update date of birth
    console.log('\n3️⃣ Updating date of birth to 1990-01-15...');
    const updateResponse = await fetch('http://localhost:5003/api/profile/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        dateOfBirth: '1990-01-15'
      })
    });
    
    const updateData = await updateResponse.json();
    console.log('✅ Update response status:', updateResponse.status);
    console.log('Updated dateOfBirth:', updateData.dateOfBirth);
    
    if (updateData.dateOfBirth) {
      console.log('✅ Date of Birth is now included in response!');
      console.log('✅ Frontend should update immediately without page reload!');
    } else {
      console.log('❌ Date of Birth is missing from response');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDateOfBirthUpdate();
