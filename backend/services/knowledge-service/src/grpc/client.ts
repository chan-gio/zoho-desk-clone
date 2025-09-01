import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

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

export class KnowledgeGrpcClient {
  private articleService: any;
  private categoryService: any;
  private searchService: any;

  constructor(serverAddress: string = 'localhost:50053') {
    this.articleService = new knowledgeProto.ArticleService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.categoryService = new knowledgeProto.CategoryService(
      serverAddress,
      grpc.credentials.createInsecure()
    );

    this.searchService = new knowledgeProto.SearchService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  // Article Service Methods
  async getArticle(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.getArticle({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createArticle(articleData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.createArticle(articleData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateArticle(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.updateArticle({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteArticle(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.deleteArticle({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listArticles(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.listArticles(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async publishArticle(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.publishArticle({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async unpublishArticle(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.articleService.unpublishArticle({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Category Service Methods
  async getCategory(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.getCategory({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async createCategory(categoryData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.createCategory(categoryData, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async updateCategory(id: string, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.updateCategory({ id, ...updateData }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async deleteCategory(id: string, tenantId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.deleteCategory({ id, tenantId }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async listCategories(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.listCategories(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getCategoryTree(tenantId: string, includeArticleCount: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.getCategoryTree({ tenantId, includeArticleCount }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Search Service Methods
  async searchArticles(searchParams: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.searchService.searchArticles(searchParams, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async searchByCategory(categoryId: string, tenantId: string, page: number, limit: number, sortBy: string, sortOrder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.searchService.searchByCategory({ categoryId, tenantId, page, limit, sortBy, sortOrder }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getPopularArticles(tenantId: string, limit: number, period: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.searchService.getPopularArticles({ tenantId, limit, period }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getRelatedArticles(articleId: string, tenantId: string, limit: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.searchService.getRelatedArticles({ articleId, tenantId, limit }, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Close connections
  close(): void {
    this.articleService.close();
    this.categoryService.close();
    this.searchService.close();
  }
}

// Export singleton instance
export const knowledgeGrpcClient = new KnowledgeGrpcClient(); 