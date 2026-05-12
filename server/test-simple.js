require('dotenv').config();

// Simple test without Razorpay SDK
const express = require('express');
const { authMiddleware } = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use('/api/payments/create-order', authMiddleware, async (req, res) => {
  try {
    console.log('Simple test - User:', req.user);
    console.log('Simple test - Creating mock order...');
    
    // Return a mock successful response for now
    const mockOrder = {
      id: 'order_mock_' + Date.now(),
      amount: 14900,
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`,
      status: 'created'
    };
    
    console.log('Mock order created:', mockOrder);
    res.json(mockOrder);
    
  } catch (error) {
    console.error('Simple test error:', error);
    res.status(500).json({ error: 'Simple test failed' });
  }
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Simple test server running on port ${PORT}`);
});
