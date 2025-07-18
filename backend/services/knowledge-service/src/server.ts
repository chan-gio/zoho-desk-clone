import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function start() {
  const MONGO_URI = process.env.MONGO_URI!;
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
  });
  console.log('✅ Mongoose connected to Atlas successfully');

  // Import model và app SAU khi connect
  require('./models/article.model');
  const app = (await import('./app')).default;

  const PORT = process.env.PORT || 4003;
  app.listen(PORT, () => {
    console.log(`🎯 Knowledge Service listening on port ${PORT}`);
  });
}

start();