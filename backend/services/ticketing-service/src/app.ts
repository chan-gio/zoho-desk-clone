import express from 'express';
import { errorHandlerMiddleware } from '../../../shared/src/middlewares/error.middleware';

const app = express();
app.use(express.json());

// Error handler cuối cùng
app.use(errorHandlerMiddleware);

export default app; 