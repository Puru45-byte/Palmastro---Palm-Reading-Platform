const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const prisma = require('../utils/prisma');

const router = express.Router();

// GET /api/readings/my-readings - Get user's palm readings
router.get('/my-readings', authMiddleware, async (req, res) => {
  try {
    const readings = await prisma.request.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        question: true,
        answer: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(readings);
  } catch (error) {
    console.error('Get user readings error:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch readings', 
      details: error.message 
    });
  }
});

module.exports = router;
