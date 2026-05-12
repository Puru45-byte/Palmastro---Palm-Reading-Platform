const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const prisma = require('../utils/prisma');

const router = express.Router();

// GET /api/orders/my-orders - Get user's order history
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await prisma.request.findMany({
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

    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch orders', 
      details: error.message 
    });
  }
});

module.exports = router;
