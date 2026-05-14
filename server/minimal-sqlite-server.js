require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ 
      status: 'Server is running', 
      database: 'SQLite connected',
      userCount: userCount 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      error: error.message 
    });
  }
});

// Profile endpoints
app.get('/api/profile/me', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users[0] || { message: 'No users found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/profile/profile', async (req, res) => {
  try {
    const { name, phone, dateOfBirth } = req.body;
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Find first user for testing
    let user = await prisma.user.findFirst();
    if (!user) {
      // Create test user if none exists
      user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'USER'
        }
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        phone: phone || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
      }
    });

    res.json({
      id: updatedUser.id,
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      email: updatedUser.email,
      phone: updatedUser.phone
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ SQLite Server running on port ${PORT}`);
});
