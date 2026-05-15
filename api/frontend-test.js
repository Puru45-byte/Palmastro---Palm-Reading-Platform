console.log('🧪 Testing Frontend-to-Backend Connection...\n');

// Test the exact same endpoints that frontend is trying to access
const endpoints = [
  '/api/health',
  '/api/profile/me',
  '/api/readings/my-readings'
];

async function testEndpoints() {
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint}...`);
      
      const response = await fetch(`http://localhost:5003${endpoint}`);
      
      if (response.ok) {
        console.log(`✅ ${endpoint} - Status: ${response.status}`);
      } else {
        console.log(`❌ ${endpoint} - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error.message}`);
    }
  }
}

testEndpoints().then(() => {
  console.log('\n🎯 Frontend Test Results:');
  console.log('If all endpoints show ✅, then the issue is with Vite proxy');
  console.log('If endpoints show ❌, then there\'s still a backend issue');
  console.log('\n📋 Next Steps:');
  console.log('1. Check Vite configuration (vite.config.js)');
  console.log('2. Check if proxy is correctly configured');
  console.log('3. Restart frontend development server');
});
