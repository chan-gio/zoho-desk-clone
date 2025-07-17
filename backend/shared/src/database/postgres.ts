import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], 
});

prisma.$connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL via Prisma');
  })
  .catch((err: any) => {
    console.error('❌ Prisma connection error:', err);
    process.exit(1);
  });

export { prisma };
