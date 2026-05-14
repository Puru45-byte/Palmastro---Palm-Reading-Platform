const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.get('/test-health', async (req, res) => {
  try {
    console.log('Health check called');
    
    // Test database connection
    const userCount = await prisma.user.count();
    console.log('Database test - user count:', userCount);
    
    res.json({ 
      status: 'ok', 
      database: 'connected',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error.message);
    res.status(500).json({ 
      status: 'error', 
      error: error.message 
    });
  }
});

const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
