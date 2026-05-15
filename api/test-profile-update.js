
async function testProfileUpdate() {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbW9rNjQ2dXAwMDAwbGwwOHluMnBoeDhmIiwiaWF0IjoxNzc3NDczOTk2LCJleHAiOjE3NzgwNzg3OTZ9.slTpICVSbGwsX5MUGwHUc1YHctIErWld_bdJBKFLNgY';
    
    console.log('Testing profile update...');
    
    // Test 1: Update name
    const response1 = await fetch('http://localhost:5002/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Updated Test User',
        phone: '9876543210',
        dateOfBirth: '1990-01-01'
      })
    });
    
    const result1 = await response1.json();
    console.log('✅ Profile update response:', JSON.stringify(result1, null, 2));
    
    // Test 2: Check updated user
    const response2 = await fetch('http://localhost:5002/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const result2 = await response2.json();
    console.log('✅ Updated user data:', JSON.stringify(result2, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testProfileUpdate();
