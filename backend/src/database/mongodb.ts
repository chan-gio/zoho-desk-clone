import mongoose from 'mongoose';

let mongoConnection: typeof mongoose;

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URI || 'mongodb://admin:admin123@localhost:27017/zoho_desk?authSource=admin';
    
    mongoConnection = await mongoose.connect(mongoUrl, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

export const getMongoConnection = (): typeof mongoose => {
  if (!mongoConnection) {
    throw new Error('MongoDB connection not initialized. Call connectMongoDB() first.');
  }
  return mongoConnection;
};

export const disconnectMongoDB = async (): Promise<void> => {
  if (mongoConnection) {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};
