require('dotenv').config();

const API_BASE = 'http://localhost:5003/api';

async function testAPI() {
  console.log('🧪 Testing Production Server API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const health = await healthResponse.json();
    console.log('✅ Health:', health.status, '| Users:', health.userCount);

    // Test 2: Login with Test User
    console.log('\n2️⃣ Testing Login...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('   User:', loginData.user.firstName, loginData.user.lastName);
      console.log('   Token:', loginData.token.substring(0, 20) + '...');
      
      const token = loginData.token;

      // Test 3: Get Profile
      console.log('\n3️⃣ Testing Get Profile...');
      const profileResponse = await fetch(`${API_BASE}/profile/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const profile = await profileResponse.json();
      
      if (profileResponse.ok) {
        console.log('✅ Profile retrieved!');
        console.log('   Name:', profile.name);
        console.log('   Email:', profile.email);
        console.log('   Phone:', profile.phone || 'Not set');

        // Test 4: Update Profile
        console.log('\n4️⃣ Testing Profile Update...');
        const updateResponse = await fetch(`${API_BASE}/profile/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: 'Updated Test User',
            phone: '+9876543210',
            dateOfBirth: '1995-05-15'
          })
        });
        
        if (updateResponse.ok) {
          console.log('✅ Profile updated successfully!');
          const updatedProfile = await updateResponse.json();
          console.log('   New Name:', updatedProfile.name);
          console.log('   New Phone:', updatedProfile.phone);
        } else {
          console.log('❌ Profile update failed');
        }

        // Test 5: Get Readings
        console.log('\n5️⃣ Testing Get Readings...');
        const readingsResponse = await fetch(`${API_BASE}/readings/my-readings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const readings = await readingsResponse.json();
        
        if (readingsResponse.ok) {
          console.log('✅ Readings retrieved!');
          console.log('   Count:', readings.length);
          readings.forEach((reading, index) => {
            console.log(`   ${index + 1}. ${reading.title} (${reading.type})`);
          });
        } else {
          console.log('❌ Readings fetch failed');
        }

        // Test 6: Get Orders
        console.log('\n6️⃣ Testing Get Orders...');
        const ordersResponse = await fetch(`${API_BASE}/orders/my-orders`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const orders = await ordersResponse.json();
        
        if (ordersResponse.ok) {
          console.log('✅ Orders retrieved!');
          console.log('   Count:', orders.length);
          orders.forEach((order, index) => {
            console.log(`   ${index + 1}. ${order.orderType} - ₹${order.amount} (${order.status})`);
          });
        } else {
          console.log('❌ Orders fetch failed');
        }

      } else {
        console.log('❌ Profile fetch failed');
      }
    } else {
      console.log('❌ Login failed:', loginData.error);
    }

    console.log('\n🎉 Production Server API Test Complete!');
    console.log('\n📋 Ready for Frontend Integration:');
    console.log('🔑 Test Login: test@palmastro.com / test123');
    console.log('🔑 Admin Login: admin@palmastro.com / admin123');
    console.log('🌐 API Base: http://localhost:5003/api');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();
