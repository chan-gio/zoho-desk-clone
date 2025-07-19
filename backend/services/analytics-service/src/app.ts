import express from 'express';
import reportRoutes from './routes/report.routes';
import dashboardRoutes from './routes/dashboard.routes';
import analyticsRoutes from './routes/analytics.routes';
import { errorHandlerMiddleware } from '../../../shared/src/middlewares/error.middleware';
import { authMiddleware } from '../../../shared/src/middlewares/auth.middleware';
import { tenantGuard } from '../../../shared/src/middlewares/tenant.middleware';

const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use(tenantGuard);

app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/analytics', analyticsRoutes);

app.use(errorHandlerMiddleware);

export default app; 