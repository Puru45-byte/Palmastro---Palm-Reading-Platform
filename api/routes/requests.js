const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { sendAnswerEmail } = require('../utils/email');
const prisma = require('../utils/prisma');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { question, leftPalmUrl, rightPalmUrl } = req.body;

    const request = await prisma.request.create({
      data: {
        userId: req.user.id,
        question,
        leftPalmUrl,
        rightPalmUrl,
        paymentStatus: 'COMPLETED',
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.json(request);
  } catch (error) {
    console.error('Request creation error:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    
    const where = status ? { status: status.toUpperCase() } : {};
    
    const requests = await prisma.request.findMany({
      where,
      select: {
        id: true,
        userId: true,
        question: true,
        answer: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        leftPalmUrl: true,
        rightPalmUrl: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            dateOfBirth: true,
            birthPlace: true,
            birthTime: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(requests);
  } catch (error) {
    console.error('Fetch requests error:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const request = await prisma.request.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        userId: true,
        question: true,
        answer: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        leftPalmUrl: true,
        rightPalmUrl: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            dateOfBirth: true,
            birthPlace: true,
            birthTime: true
          }
        }
      }
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error('Fetch request error:', error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
});

router.put('/:id/answer', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { answer } = req.body;

    const request = await prisma.request.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const updatedRequest = await prisma.request.update({
      where: { id: req.params.id },
      data: {
        answer,
        status: 'COMPLETED'
      }
    });

    await sendAnswerEmail(request.user.email, request.question, answer);

    res.json(updatedRequest);
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

module.exports = router;
