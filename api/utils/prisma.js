const { PrismaClient } = require('@prisma/client');

// Create a singleton instance to avoid multiple connections
let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
}

prisma = global.prisma;

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
