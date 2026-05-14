const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const prisma = require('../utils/prisma');

const router = express.Router();

// GET /api/auth/me - Get current user info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        birthPlace: true,
        birthTime: true,
        createdAt: true
      }
    });

    res.json({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      birthPlace: user.birthPlace,
      birthTime: user.birthTime,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, name, phone, dateOfBirth, birthPlace, birthTime } = req.body;
    
    // Handle both old format (name) and new format (firstName, lastName)
    let finalFirstName = firstName;
    let finalLastName = lastName;
    
    if (name && !firstName) {
      // Old format - split name into first and last
      const nameParts = name.trim().split(' ');
      finalFirstName = nameParts[0] || '';
      finalLastName = nameParts.slice(1).join(' ') || '';
    }

    // Only update fields that are provided
    const updateData = {};
    if (finalFirstName !== undefined) updateData.firstName = finalFirstName;
    if (finalLastName !== undefined) updateData.lastName = finalLastName;
    if (phone !== undefined) updateData.phone = phone || null;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    if (birthPlace !== undefined) updateData.birthPlace = birthPlace || null;
    if (birthTime !== undefined) updateData.birthTime = birthTime || null;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData
    });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        birthPlace: true,
        birthTime: true,
        createdAt: true
      }
    });

    res.json({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      birthPlace: user.birthPlace,
      birthTime: user.birthTime,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
