import { Article, IArticle } from '../models/mongodb/article.schema.js';
import mongoose from 'mongoose';

export class ArticleService {
  async createArticle(data: Partial<IArticle>): Promise<IArticle> {
    try {
      // Kiểm tra connection state
      if (mongoose.connection.readyState !== 1) {
        throw new Error(`MongoDB connection not ready. State: ${mongoose.connection.readyState}`);
      }
      
      console.log('Creating article with data:', JSON.stringify(data, null, 2));
      
      const article = new Article(data);
      const savedArticle = await article.save();
      
      console.log('Article created successfully:', savedArticle._id);
      return savedArticle;
      
    } catch (error) {
      console.error('ArticleService.createArticle error:', error);
      
      if (error instanceof mongoose.Error.ValidationError) {
        throw new Error(`Validation error: ${error.message}`);
      }
      
      if (error instanceof mongoose.Error.MongooseServerSelectionError) {
        throw new Error(`Database connection error: ${error.message}`);
      }
      
      throw error;
    }
  }

  async getArticleById(id: string, tenantId: string): Promise<IArticle | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid article ID format');
      }
      
      const article = await Article.findOne({ _id: id, tenantId });
      
      if (article) {
        // Tăng view count
        await Article.updateOne({ _id: id }, { $inc: { views: 1 } });
      }
      
      return article;
    } catch (error) {
      console.error('ArticleService.getArticleById error:', error);
      throw error;
    }
  }

  async updateArticle(id: string, tenantId: string, data: Partial<IArticle>): Promise<IArticle | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid article ID format');
      }
      
      const article = await Article.findOneAndUpdate(
        { _id: id, tenantId },
        data,
        { new: true, runValidators: true }
      );
      
      return article;
    } catch (error) {
      console.error('ArticleService.updateArticle error:', error);
      throw error;
    }
  }

  async deleteArticle(id: string, tenantId: string): Promise<IArticle | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid article ID format');
      }
      
      const article = await Article.findOneAndDelete({ _id: id, tenantId });
      return article;
    } catch (error) {
      console.error('ArticleService.deleteArticle error:', error);
      throw error;
    }
  }

  async listArticles(tenantId: string, filter: any = {}, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const query = { tenantId, ...filter };
      
      const [articles, total] = await Promise.all([
        Article.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Article.countDocuments(query)
      ]);

      return {
        articles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('ArticleService.listArticles error:', error);
      throw error;
    }
  }

  async searchArticles(tenantId: string, keyword: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const searchQuery = {
        tenantId,
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { content: { $regex: keyword, $options: 'i' } },
          { summary: { $regex: keyword, $options: 'i' } },
          { tags: { $in: [new RegExp(keyword, 'i')] } }
        ]
      };

      const [articles, total] = await Promise.all([
        Article.find(searchQuery)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Article.countDocuments(searchQuery)
      ]);

      return {
        articles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('ArticleService.searchArticles error:', error);
      throw error;
    }
  }
}
