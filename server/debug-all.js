console.log('=== COMPREHENSIVE DEBUG START ===');

// 1. Check environment variables
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT);

// 2. Test database connection step by step
async function testDatabase() {
  console.log('\n--- Testing Database Connection ---');
  try {
    const { PrismaClient } = require('@prisma/client');
    
    // Test basic connection
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
    
    console.log('Attempting to connect to database...');
    
    // Simple connection test
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Raw query result:', result);
    
    // Test user table access
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
    
    console.log('✅ Database connection SUCCESSFUL');
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('❌ Database connection FAILED:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

// 3. Test imports
function testImports() {
  console.log('\n--- Testing Imports ---');
  try {
    require('express');
    require('cors');
    require('dotenv');
    const { PrismaClient } = require('@prisma/client');
    console.log('✅ All imports successful');
    return true;
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    return false;
  }
}

// 4. Test server startup
async function testServer() {
  console.log('\n--- Testing Server Startup ---');
  try {
    const express = require('express');
    const app = express();
    
    // Basic middleware
    app.use(express.json());
    
    // Test route
    app.get('/debug', (req, res) => {
      res.json({
        message: 'Debug endpoint working',
        timestamp: new Date().toISOString(),
        env: {
          database: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
          jwt: process.env.JWT_SECRET ? 'SET' : 'NOT SET'
        }
      });
    });
    
    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () => {
      console.log(`✅ Server started successfully on port ${PORT}`);
      return true;
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('=== RUNNING ALL DIAGNOSTIC TESTS ===');
  
  const importsOk = testImports();
  const dbOk = await testDatabase();
  const serverOk = await testServer();
  
  console.log('\n=== TEST RESULTS ===');
  console.log('Imports:', importsOk ? '✅ PASS' : '❌ FAIL');
  console.log('Database:', dbOk ? '✅ PASS' : '❌ FAIL');
  console.log('Server:', serverOk ? '✅ PASS' : '❌ FAIL');
  
  if (importsOk && dbOk && serverOk) {
    console.log('\n🎉 ALL TESTS PASSED - Server should work correctly!');
  } else {
    console.log('\n💥 SOME TESTS FAILED - Check the failed tests above');
  }
}

runAllTests().catch(console.error);
