import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('[MongoDB] process.env.MONGO_URI:', process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('[MongoDB] ❌ MONGO_URI is not set in environment variables!');
  process.exit(1);
}

let isConnected = false;

export async function connectMongo() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  try {
    // Disconnect any existing connections first
    if (mongoose.connection.readyState !== 0) {
      console.log('🔄 Disconnecting existing connection...');
      await mongoose.disconnect();
    }

    // Test if MongoDB Atlas is accessible first
    console.log('🔍 Testing MongoDB Atlas accessibility...');
    const { MongoClient } = require('mongodb');
    const testClient = new MongoClient(MONGO_URI as string);
    
    try {
      await testClient.connect();
      await testClient.db('admin').command({ ping: 1 });
      console.log('✅ MongoDB Atlas is accessible');
      await testClient.close();
    } catch (testError) {
      const err = testError as any;
      console.error('❌ MongoDB Atlas is not accessible:', err);
    
      if (err.code === 'ENOTFOUND') {
        throw new Error('DNS resolution failed. Check internet connection.');
      } else if (err.code === 'ECONNREFUSED') {
        throw new Error('Connection refused. Check IP whitelist in MongoDB Atlas.');
      } else if (err.message && err.message.includes('authentication failed')) {
        throw new Error('Authentication failed. Check username/password in Atlas.');
      } else if (err.message && err.message.includes('not authorized')) {
        throw new Error('Authorization failed. Check user permissions in Atlas.');
      }
    
      throw new Error(`MongoDB Atlas connection failed: ${err.message}`);
    }

    // Connection options optimized for Atlas
    const options = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 15000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
    };

    console.log('🔄 Connecting to MongoDB Atlas with Mongoose...');
    console.log('MongoDB URI:', (MONGO_URI as string).replace(/:[^:@]*@/, ':***@'));
    
    await mongoose.connect(MONGO_URI as string, options);
    
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
    if (err instanceof Error) {
      console.error('Error message:', err.message);
    }
    console.error('Please check:');
    console.error('1. Internet connection');
    console.error('2. MongoDB Atlas cluster is running');
    console.error('3. IP address is whitelisted in Atlas');
    console.error('4. Username/password is correct');
    console.error('5. Database user has proper permissions');
    process.exit(1);
  }
}

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected from MongoDB');
  isConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing MongoDB connection...');
  await mongoose.connection.close();
  process.exit(0);
});

// Helper function to check connection
export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// Helper function to wait for connection
export async function waitForConnection(maxRetries = 10, retryDelay = 1000): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    if (isMongoConnected()) {
      return;
    }
    console.log(`⏳ Waiting for MongoDB connection... (${i + 1}/${maxRetries})`);
    await new Promise(resolve => setTimeout(resolve, retryDelay));
  }
  throw new Error('MongoDB connection timeout');
}