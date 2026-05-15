require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

console.log('Simple payment server starting...');
console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Simple payment server running' });
});

// Simple auth middleware (no database)
const simpleAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });
    
    // For testing, accept any valid JWT format
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId || 'test_user', email: 'test@example.com' };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Payment route - WORKING VERSION
app.post('/api/payments/create-order', simpleAuth, async (req, res) => {
  try {
    console.log('Payment request received');
    
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };
    
    console.log('Creating Razorpay order...');
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order.id);
    
    res.json(order);
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: 'Payment failed', details: error.message });
  }
});

// Login route (simple version)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // For testing, accept any credentials
    const token = jwt.sign({ userId: 'test_user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      user: { id: 'test_user', email: email || 'test@example.com' }, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Simple payment server running on port ${PORT}`);
  console.log('Ready to process payments!');
});
