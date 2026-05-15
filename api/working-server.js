require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Mock auth endpoints for testing
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Mock user creation
    const mockUser = {
      id: 'mock-user-id',
      firstName,
      lastName,
      email,
      role: 'USER'
    };
    
    const token = jwt.sign(
      { userId: mockUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Mock registration successful:', { firstName, lastName, email });
    
    res.json({ user: mockUser, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Mock user login
    const mockUser = {
      id: 'mock-user-id',
      firstName: 'Test',
      lastName: 'User',
      email,
      role: 'USER'
    };
    
    const token = jwt.sign(
      { userId: mockUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Mock login successful:', { email });
    
    res.json({ user: mockUser, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Mock user data
    const mockUser = {
      id: decoded.userId,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      role: 'USER'
    };
    
    res.json(mockUser);
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Working server running on port ${PORT}`);
  console.log('Test endpoints:');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/auth/me');
  console.log('- GET /api/health');
});
