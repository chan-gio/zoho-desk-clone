import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const TenantModel = prisma.tenant;
