require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

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

console.log('Payment server starting...');
console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Payment server running' });
});

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
    if (!user) return res.status(401).json({ error: 'User not found' });
    
    req.user = user;
    next();
  } catch (error) {
    console.log('Auth error:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Payment route - SIMPLE AND DIRECT
app.post('/api/payments/create-order', authMiddleware, async (req, res) => {
  try {
    console.log('Payment request from user:', req.user.email);
    
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`,
      payment_capture: 1
    };
    
    console.log('Creating Razorpay order...');
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order.id);
    
    res.json(order);
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: 'Payment failed', details: error.message });
  }
});

// Login route for testing
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
  console.log('Ready to process payments!');
});
