import Joi from 'joi';
import { z } from 'zod';

// Example Joi schema for creating a ticket
export const createTicketSchemaJoi = Joi.object({
  subject: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  requesterId: Joi.string().uuid().required(),
  tenantId: Joi.string().uuid().required(),
});

// Zod schema alternative (more composable for TypeScript)
export const CreateTicketSchemaZod = z.object({
  subject: z.string().min(3).max(100),
  description: z.string().min(5),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  requesterId: z.string().uuid(),
  tenantId: z.string().uuid(),
});
