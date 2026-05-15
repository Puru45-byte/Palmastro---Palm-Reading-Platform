require('dotenv').config();

async function testCompleteFlow() {
  console.log('🧪 Testing Complete First Name/Last Name Flow...\n');

  try {
    // Step 1: Fresh login
    console.log('1️⃣ Testing fresh login...');
    const loginResponse = await fetch('http://localhost:5003/api/auth/login', {
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
    console.log('User from login:', {
      firstName: loginData.user.firstName,
      lastName: loginData.user.lastName,
      email: loginData.user.email
    });
    
    const token = loginData.token;
    
    // Step 2: Get profile data
    console.log('\n2️⃣ Getting profile data...');
    const profileResponse = await fetch('http://localhost:5003/api/profile/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profileData = await profileResponse.json();
    
    if (!profileResponse.ok) {
      console.log('❌ Profile fetch failed:', profileData.error);
      return;
    }
    
    console.log('✅ Profile data received:');
    console.log('  Name:', profileData.name);
    console.log('  First Name:', profileData.firstName);
    console.log('  Last Name:', profileData.lastName);
    console.log('  Email:', profileData.email);
    
    // Step 3: Update first name
    console.log('\n3️⃣ Updating first name to "John"...');
    const firstNameUpdate = await fetch('http://localhost:5003/api/profile/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: 'John'
      })
    });
    
    const firstNameResult = await firstNameUpdate.json();
    
    if (!firstNameUpdate.ok) {
      console.log('❌ First name update failed:', firstNameResult.error);
    } else {
      console.log('✅ First name updated successfully!');
      console.log('  New first name:', firstNameResult.firstName);
    }
    
    // Step 4: Update last name
    console.log('\n4️⃣ Updating last name to "Doe"...');
    const lastNameUpdate = await fetch('http://localhost:5003/api/profile/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        lastName: 'Doe'
      })
    });
    
    const lastNameResult = await lastNameUpdate.json();
    
    if (!lastNameUpdate.ok) {
      console.log('❌ Last name update failed:', lastNameResult.error);
    } else {
      console.log('✅ Last name updated successfully!');
      console.log('  New last name:', lastNameResult.lastName);
    }
    
    // Step 5: Final verification
    console.log('\n5️⃣ Final verification...');
    const finalProfile = await fetch('http://localhost:5003/api/profile/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const finalData = await finalProfile.json();
    
    if (finalProfile.ok) {
      console.log('✅ Final profile data:');
      console.log('  Name:', finalData.name);
      console.log('  First Name:', finalData.firstName);
      console.log('  Last Name:', finalData.lastName);
      console.log('  Email:', finalData.email);
    }
    
    console.log('\n🎉 Complete flow test finished!');
    console.log('✅ Frontend should now show:');
    console.log('  - First Name: John');
    console.log('  - Last Name: Doe');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCompleteFlow();
