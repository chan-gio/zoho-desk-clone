import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../services/search.service';

// Load proto file
const PROTO_PATH = path.join(__dirname, 'knowledge.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const knowledgeProto = protoDescriptor.knowledge as any;

// Initialize services
const articleService = new ArticleService();
const categoryService = new CategoryService();
const searchService = new SearchService();

// Article Service Implementation
const articleServiceImplementation = {
  getArticle: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const article = await articleService.getArticleById(id, tenantId);
      
      if (!article) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Article not found'
        });
      }

      callback(null, { article });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createArticle: async (call: any, callback: any) => {
    try {
      const articleData = call.request;
      const article = await articleService.createArticle(articleData);
      callback(null, { article });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateArticle: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const article = await articleService.updateArticle(id, updateData);
      callback(null, { article });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteArticle: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await articleService.deleteArticle(id, tenantId);
      callback(null, { success: true, message: 'Article deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listArticles: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await articleService.listArticles(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  publishArticle: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const article = await articleService.publishArticle(id, tenantId);
      callback(null, { article });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  unpublishArticle: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const article = await articleService.unpublishArticle(id, tenantId);
      callback(null, { article });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Category Service Implementation
const categoryServiceImplementation = {
  getCategory: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      const category = await categoryService.getCategoryById(id, tenantId);
      
      if (!category) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Category not found'
        });
      }

      callback(null, { category });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  createCategory: async (call: any, callback: any) => {
    try {
      const categoryData = call.request;
      const category = await categoryService.createCategory(categoryData);
      callback(null, { category });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  updateCategory: async (call: any, callback: any) => {
    try {
      const { id, ...updateData } = call.request;
      const category = await categoryService.updateCategory(id, updateData);
      callback(null, { category });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  deleteCategory: async (call: any, callback: any) => {
    try {
      const { id, tenantId } = call.request;
      await categoryService.deleteCategory(id, tenantId);
      callback(null, { success: true, message: 'Category deleted successfully' });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listCategories: async (call: any, callback: any) => {
    try {
      const params = call.request;
      const result = await categoryService.listCategories(params);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getCategoryTree: async (call: any, callback: any) => {
    try {
      const { tenantId, includeArticleCount } = call.request;
      const result = await categoryService.getCategoryTree(tenantId, includeArticleCount);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Search Service Implementation
const searchServiceImplementation = {
  searchArticles: async (call: any, callback: any) => {
    try {
      const searchParams = call.request;
      const result = await searchService.searchArticles(searchParams);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  searchByCategory: async (call: any, callback: any) => {
    try {
      const { categoryId, tenantId, page, limit, sortBy, sortOrder } = call.request;
      const result = await searchService.searchByCategory({
        categoryId,
        tenantId,
        page,
        limit,
        sortBy,
        sortOrder
      });
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getPopularArticles: async (call: any, callback: any) => {
    try {
      const { tenantId, limit, period } = call.request;
      const result = await searchService.getPopularArticles(tenantId, limit, period);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getRelatedArticles: async (call: any, callback: any) => {
    try {
      const { articleId, tenantId, limit } = call.request;
      const result = await searchService.getRelatedArticles(articleId, tenantId, limit);
      callback(null, result);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
};

// Create gRPC server
export function createGrpcServer(): grpc.Server {
  const server = new grpc.Server();

  // Add services to server
  server.addService(knowledgeProto.ArticleService.service, articleServiceImplementation);
  server.addService(knowledgeProto.CategoryService.service, categoryServiceImplementation);
  server.addService(knowledgeProto.SearchService.service, searchServiceImplementation);

  return server;
}

// Start gRPC server
export function startGrpcServer(port: number = 50053): grpc.Server {
  const server = createGrpcServer();
  
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Failed to start gRPC server:', err);
        return;
      }
      
      server.start();
      console.log(`gRPC server running on port ${port}`);
    }
  );

  return server;
} 