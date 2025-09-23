import { getPrismaClient } from './postgres.js';
import { getMongoConnection } from './mongodb.js';
import { logger } from '../shared/utils/logger.js';

export async function seedDatabase() {
  try {
    logger.info('Starting database seeding...');
    
    const prisma = getPrismaClient();
    const mongoose = getMongoConnection();

    // Seed PostgreSQL data
    await seedPostgreSQL(prisma);
    
    // Seed MongoDB data
    await seedMongoDB(mongoose);
    
    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Database seeding failed:', error);
    throw error;
  }
}

async function seedPostgreSQL(prisma: any) {
  // Create tenant
  const tenant = await prisma.tenant.upsert({
    where: { id: 'default-tenant' },
    update: {},
    create: {
      id: 'default-tenant',
      name: 'Default Tenant',
      domain: 'localhost',
      isActive: true
    }
  });

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      tenantId: tenant.id,
      isActive: true
    }
  });

  // Create agent user
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@example.com' },
    update: {},
    create: {
      email: 'agent@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
      firstName: 'Agent',
      lastName: 'User',
      role: 'AGENT',
      tenantId: tenant.id,
      isActive: true
    }
  });

  // Create customer user
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
      firstName: 'Customer',
      lastName: 'User',
      role: 'CUSTOMER',
      tenantId: tenant.id,
      isActive: true
    }
  });

  // Create sample tickets
  const tickets = [
    {
      title: 'Login Issue',
      description: 'Unable to login to the system',
      priority: 'HIGH',
      status: 'OPEN',
      category: 'Technical',
      createdById: customerUser.id,
      assigneeId: agentUser.id,
      tenantId: tenant.id
    },
    {
      title: 'Password Reset',
      description: 'Need help resetting my password',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      category: 'Account',
      createdById: customerUser.id,
      assigneeId: agentUser.id,
      tenantId: tenant.id
    },
    {
      title: 'Feature Request',
      description: 'Would like to request a new feature',
      priority: 'LOW',
      status: 'OPEN',
      category: 'Enhancement',
      createdById: customerUser.id,
      tenantId: tenant.id
    }
  ];

  for (const ticketData of tickets) {
    await prisma.ticket.upsert({
      where: { 
        title_createdById: {
          title: ticketData.title,
          createdById: ticketData.createdById
        }
      },
      update: {},
      create: ticketData
    });
  }

  logger.info('PostgreSQL seeding completed');
}

async function seedMongoDB(mongoose: any) {
  // Create Article schema if not exists
  const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    categoryId: String,
    tags: [String],
    isPublished: Boolean,
    authorId: String,
    tenantId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

  // Create Category schema if not exists
  const CategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    tenantId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

  // Create categories
  const categories = [
    {
      name: 'General',
      description: 'General knowledge base articles',
      tenantId: 'default-tenant'
    },
    {
      name: 'Technical',
      description: 'Technical support articles',
      tenantId: 'default-tenant'
    },
    {
      name: 'Account',
      description: 'Account management articles',
      tenantId: 'default-tenant'
    }
  ];

  for (const categoryData of categories) {
    await Category.findOneAndUpdate(
      { name: categoryData.name, tenantId: categoryData.tenantId },
      categoryData,
      { upsert: true, new: true }
    );
  }

  // Get category IDs
  const generalCategory = await Category.findOne({ name: 'General' });
  const technicalCategory = await Category.findOne({ name: 'Technical' });

  // Create articles
  const articles = [
    {
      title: 'How to Reset Your Password',
      content: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions in the email.',
      categoryId: generalCategory._id,
      tags: ['password', 'reset', 'login'],
      isPublished: true,
      authorId: 'admin-user-id',
      tenantId: 'default-tenant'
    },
    {
      title: 'System Requirements',
      content: 'Our system requires a modern web browser with JavaScript enabled. Supported browsers include Chrome, Firefox, Safari, and Edge.',
      categoryId: technicalCategory._id,
      tags: ['system', 'requirements', 'browser'],
      isPublished: true,
      authorId: 'admin-user-id',
      tenantId: 'default-tenant'
    },
    {
      title: 'Creating a New Account',
      content: 'To create a new account, click the "Sign Up" button on the homepage and fill in the required information.',
      categoryId: generalCategory._id,
      tags: ['account', 'signup', 'registration'],
      isPublished: true,
      authorId: 'admin-user-id',
      tenantId: 'default-tenant'
    }
  ];

  for (const articleData of articles) {
    await Article.findOneAndUpdate(
      { title: articleData.title, tenantId: articleData.tenantId },
      articleData,
      { upsert: true, new: true }
    );
  }

  logger.info('MongoDB seeding completed');
}

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
