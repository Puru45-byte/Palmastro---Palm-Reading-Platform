require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Simple auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log('Auth error:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

console.log('Razorpay initialized with key:', process.env.RAZORPAY_KEY_ID);

// Payment route with detailed logging
app.post('/api/payments/create-order', authMiddleware, async (req, res) => {
  try {
    console.log('=== PAYMENT REQUEST RECEIVED ===');
    console.log('User:', req.user);
    console.log('User ID:', req.user.id);
    
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`,
      payment_capture: 1
    };
    
    console.log('Creating order with options:', options);
    
    const order = await razorpay.orders.create(options);
    
    console.log('Order created successfully:', order.id);
    console.log('=== PAYMENT SUCCESS ===');
    
    res.json(order);
  } catch (error) {
    console.error('=== PAYMENT ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    
    res.status(500).json({ 
      error: 'Failed to create payment order', 
      details: error.message,
      code: error.code 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Test payment without auth
app.post('/api/test-payment', async (req, res) => {
  try {
    console.log('=== TEST PAYMENT REQUEST ===');
    
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`,
      payment_capture: 1
    };
    
    console.log('Creating test order with options:', options);
    
    const order = await razorpay.orders.create(options);
    
    console.log('Test order created successfully:', order.id);
    console.log('=== TEST PAYMENT SUCCESS ===');
    
    res.json(order);
  } catch (error) {
    console.error('=== TEST PAYMENT ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({ 
      error: 'Failed to create test payment order', 
      details: error.message,
      code: error.code 
    });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
  console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
  console.log('Razorpay Secret set:', !!process.env.RAZORPAY_SECRET);
});
