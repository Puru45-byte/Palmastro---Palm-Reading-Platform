const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { authMiddleware } = require('../middleware/auth');
const prisma = require('../utils/prisma');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    console.log('Registration attempt for email:', email);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('Registration failed: Email already exists');
      return res.status(400).json({ error: 'Email already registered. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = email === process.env.ADMIN_EMAIL ? 'ADMIN' : 'USER';

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName: lastName || '',
        email,
        password: hashedPassword,
        phone: phone || null,
        role
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        role: true,
        createdAt: true
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    console.log('Request body:', req.body);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log('User found:', !!user);
    if (user) {
      console.log('User has password:', !!user.password);
    }

    if (!user || !user.password) {
      console.log('Login failed: User not found or no password');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Login failed: Password mismatch');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/google', (req, res, next) => {
  console.log('Google OAuth route hit');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/premium-login' }),
  async (req, res) => {
    console.log('Google OAuth callback successful');
    console.log('User:', req.user);
    
    const token = jwt.sign(
      { userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    console.log('Redirecting to:', `${frontendUrl}/form`);
    res.redirect(`${frontendUrl}/form`);
  }
);

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        role: true,
        createdAt: true
      }
    });

    res.json({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      role: user.role
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, dateOfBirth } = req.body;
    const nameParts = name ? name.trim().split(' ') : [];
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) })
      }
    });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        createdAt: true,
        role: true
      }
    });

    res.json({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      role: user.role
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

module.exports = router;
