// Comment model chỉ dùng cho type-checking, không dùng Mongoose/MongoDB nữa
import { TicketComment as PrismaComment } from '../../../../shared/prisma/generated/client';
 
export type Comment = PrismaComment; 