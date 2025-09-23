import { PrismaClient } from '../../prisma/generated/client/index.js';

let prisma: PrismaClient;

export const connectPostgres = async (): Promise<void> => {
  try {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:postgres123@localhost:5432/zoho_desk'
        }
      }
    });

    await prisma.$connect();
    console.log('✅ PostgreSQL connected successfully');
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    throw new Error('Prisma client not initialized. Call connectPostgres() first.');
  }
  return prisma;
};

export const disconnectPostgres = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect();
    console.log('PostgreSQL disconnected');
  }
};
