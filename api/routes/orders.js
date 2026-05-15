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
        updatedAt: true,
        razorpayOrderId: true
      }
    });

    // Get payments separately to avoid relationship issues
    const payments = await prisma.payment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        razorpayOrderId: true,
        status: true,
        amount: true,
        currency: true,
        createdAt: true,
        razorpayPaymentId: true
      }
    });

    // Combine orders with payment data
    const transformedOrders = orders.map(order => {
      const payment = payments.find(p => p.razorpayOrderId === order.razorpayOrderId);
      return {
        id: order.id,
        question: order.question,
        answer: order.answer,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        paymentStatus: payment ? payment.status : 'pending',
        amount: payment ? payment.amount : null,
        currency: payment ? payment.currency : null,
        paymentId: payment ? payment.razorpayPaymentId : null
      };
    });

    console.log('User orders:', transformedOrders);
    res.json(transformedOrders);
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
