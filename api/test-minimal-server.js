require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Simple auth middleware
const simpleAuth = async (req, res, next) => {
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
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Payment route
app.post('/api/payments/create-order', simpleAuth, async (req, res) => {
  try {
    console.log('Payment request received');
    console.log('User:', req.user);
    console.log('User ID:', req.user.id);
    
    const options = {
      amount: 14900,
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`,
      payment_capture: 1
    };
    
    console.log('Creating order...');
    console.log('Order options:', JSON.stringify(options, null, 2));
    
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order.id);
    console.log('Order details:', JSON.stringify(order, null, 2));
    
    res.json(order);
  } catch (error) {
    console.error('Payment error:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test route called');
  res.json({ message: 'Server is working!' });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
