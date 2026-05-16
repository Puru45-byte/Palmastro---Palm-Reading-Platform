const { PrismaClient } = require('@prisma/client');

// Create a singleton instance to avoid multiple connections
let prisma;

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not defined in the environment variables.');
  console.error('If you are seeing this on Vercel, make sure you have added DATABASE_URL to your Project Settings.');
}

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

prisma = global.prisma;

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
