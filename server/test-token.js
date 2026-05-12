const jwt = require('jsonwebtoken');
const prisma = require('./utils/prisma');

async function generateTestToken() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('✅ Test token generated:');
    console.log('Token:', token);
    console.log('User ID:', user.id);
    console.log('User Email:', user.email);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

generateTestToken();
