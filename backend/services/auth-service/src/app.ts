import express from 'express';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { errorHandlerMiddleware } from '../../../shared/src/middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', userRoutes);

// Error handler (cuối cùng)
app.use(errorHandlerMiddleware);

export default app;

// Nếu chạy trực tiếp
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
  });
} 