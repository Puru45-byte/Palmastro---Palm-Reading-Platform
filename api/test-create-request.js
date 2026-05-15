const prisma = require('./utils/prisma');

async function createTestRequest() {
  try {
    // Find the user
    const user = await prisma.user.findFirst({
      where: { email: 'john.doe@example.com' }
    });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ Found user:', user.email);
    
    // Create a test request
    const request = await prisma.request.create({
      data: {
        userId: user.id,
        question: 'Test question about career',
        status: 'PENDING'
      }
    });
    
    console.log('✅ Test request created:', request.id);
    
    // Create a test payment
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        razorpayOrderId: 'order_test123',
        razorpayPaymentId: 'pay_test123',
        amount: 14900,
        currency: 'INR',
        status: 'PAID'
      }
    });
    
    console.log('✅ Test payment created:', payment.id);
    
    // Check if it appears in orders
    const orders = await prisma.request.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log('✅ User orders count:', orders.length);
    console.log('✅ Latest order:', orders[0]?.question);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestRequest();
