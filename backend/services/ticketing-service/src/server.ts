import 'dotenv/config';
import app from './app';
import { PrismaClient } from '../../../shared/prisma/generated/client';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { TicketRepository } from './repositories/ticket.repository';
import { WorkflowService } from './services/workflow.service';
import { NotificationService } from './services/notification.service';
import { TicketService } from './services/ticket.service';
import { CommentRepository } from './repositories/comment.repository';
import { CommentService } from './services/comment.service';
import { DepartmentRepository } from './repositories/department.repository';
import { DepartmentService } from './services/department.service';
import { TicketController } from './controllers/ticket.controller';
import { WorkflowController } from './controllers/workflow.controller';
import { CommentController } from './controllers/comment.controller';
import { DepartmentController } from './controllers/department.controller';
import { ticketRoutes } from './routes/ticket.routes';
import { workflowRoutes } from './routes/workflow.routes';
import { departmentRoutes } from './routes/department.routes';
import { commentRoutes } from './routes/comment.routes';

const PORT = process.env.PORT || 3000;

async function start() {
  // Init Prisma
  const prisma = new PrismaClient();

  // Init HTTP server & Socket.io
  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: { origin: '*' },
  });

  // Init repositories
  const ticketRepo = new TicketRepository(prisma);
  const commentRepo = new CommentRepository(prisma);
  const departmentRepo = new DepartmentRepository(prisma);

  // Init services
  const notificationService = new NotificationService(io);
  const workflowService = new WorkflowService(prisma);
  const ticketService = new TicketService(ticketRepo, notificationService, workflowService, prisma);
  const commentService = new CommentService(commentRepo);
  const departmentService = new DepartmentService(departmentRepo);

  // Init controllers
  const ticketController = new TicketController(ticketService, commentService);
  const workflowController = new WorkflowController(workflowService);
  const commentController = new CommentController(commentService);
  const departmentController = new DepartmentController(departmentService);

  // Mount routes
  app.use(ticketRoutes(ticketController, commentController));
  app.use(workflowRoutes(workflowController));
  app.use(departmentRoutes(departmentController));
  app.use(commentRoutes(commentController));

  httpServer.listen(PORT, () => {
    console.log(`Ticketing Service listening on port ${PORT}`);
    console.log(`Socket.io running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
}); 