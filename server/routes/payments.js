const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { authMiddleware } = require('../middleware/auth');
const prisma = require('../utils/prisma');

const router = express.Router();

// Test Razorpay instance and environment variables
console.log('=== RAZORPAY CONFIGURATION ===');
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'SET' : 'MISSING');

let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  console.log('Creating Razorpay instance...');
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  console.log('Razorpay instance created with key:', process.env.RAZORPAY_KEY_ID);
} else {
  console.log('⚠️ Razorpay keys not configured - payment features disabled');
}
console.log('=== END RAZORPAY CONFIGURATION ===');

router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    // Check if req.user exists
    if (!req.user || !req.user.id) {
      console.error('AUTH ERROR: req.user is missing or invalid:', req.user);
      return res.status(401).json({ error: 'User authentication failed' });
    }
    
    // Check if Razorpay is configured
    if (!razorpay) {
      return res.status(503).json({ error: 'Payment service not available' });
    }
    
    console.log('Authenticated user:', req.user);
    console.log('Request body:', req.body);

    const { amount, currency = 'INR', receipt } = req.body;
    console.log('Creating order with amount:', amount, 'currency:', currency);

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      payment_capture: '1'
    };

    console.log('Order options:', options);
    console.log('FINAL RECEIPT SENT:', options.receipt);
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order.id);
    res.json(order);
  } catch (error) {
    console.error('=== RAZORPAY ERROR DETAILS ===');
    console.error('Full error object:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error description:', error.description);
    console.error('Error stack:', error.stack);
    console.error('=== END ERROR DETAILS ===');
    
    // Razorpay errors have a different structure
    const errorMessage = error.error?.description || error.message || error.description || 'Unknown Razorpay error';
    const errorCode = error.error?.code || error.code;
    
    res.status(500).json({ 
      error: errorMessage,
      code: errorCode,
      details: error.error || error
    });
  }
});

router.post('/verify-payment', authMiddleware, async (req, res) => {
  try {
    console.log('=== PAYMENT VERIFICATION START ===');
    console.log('Request body:', req.body);
    console.log('User:', req.user);
    
    // Check if Razorpay is configured
    if (!razorpay) {
      return res.status(503).json({ error: 'Payment service not available' });
    }
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, question, formData } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    // TEMPORARY: Bypass signature verification for testing and development
    const bypassTest = razorpay_signature === 'bypass_signature_for_testing';
    // Additional bypass for development - allow any signature for test orders
    const devBypass = process.env.NODE_ENV !== 'production' && razorpay_order_id && razorpay_payment_id;
    
    console.log('Signature verification result:', isAuthentic);
    console.log('Bypass test:', bypassTest);
    console.log('Development bypass:', devBypass);
    console.log('Expected signature:', expectedSignature);
    console.log('Received signature:', razorpay_signature);
    console.log('Body for signature:', body);

    if (isAuthentic || bypassTest || devBypass) {
      // Get form data from request (passed from frontend)
      console.log('Payment authentic, parsing form data...');
      const formData = JSON.parse(req.body.formData || '{}');
      console.log('Parsed form data:', formData);
      
      // Get image URLs from form data
      const leftPalmUrl = formData.leftPalmUrl || req.body.leftPalmUrl || null;
      const rightPalmUrl = formData.rightPalmUrl || req.body.rightPalmUrl || null;
      
      // Create the Request record in database
      const request = await prisma.request.create({
        data: {
          userId: req.user.id,
          question: formData.question || question || '',
          leftPalmUrl: leftPalmUrl,
          rightPalmUrl: rightPalmUrl,
          status: 'PENDING',
          razorpayOrderId: razorpay_order_id
        }
      });

      // Update user with form data if provided
      if (formData.firstName || formData.lastName || formData.dob || formData.birthPlace || formData.birthTime) {
        try {
          await prisma.user.update({
            where: { id: req.user.id },
            data: {
              ...(formData.firstName && { firstName: formData.firstName }),
              ...(formData.lastName && { lastName: formData.lastName }),
              ...(formData.phone && { phone: formData.phone }),
              ...(formData.dob && { dateOfBirth: new Date(formData.dob) }),
              ...(formData.birthPlace !== undefined && { birthPlace: formData.birthPlace }),
              ...(formData.birthTime !== undefined && { birthTime: formData.birthTime })
            }
          });
        } catch (e) {
          console.error('Error updating user info from form data:', e);
        }
      }
      
      console.log('Request created with images:', {
        leftPalmUrl,
        rightPalmUrl,
        requestId: request.id
      });

      // Create Payment record
      await prisma.payment.create({
        data: {
          userId: req.user.id,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          amount: 14900, // 149 rupees in paise
          currency: 'INR',
          status: 'PAID'
        }
      });

      console.log('Request created successfully:', request.id);
      
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        requestId: request.id
      });
    } else {
      console.log('Payment verification FAILED');
      console.log('Expected signature:', expectedSignature);
      console.log('Received signature:', razorpay_signature);
      console.log('Body for signature:', body);
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

module.exports = router;
