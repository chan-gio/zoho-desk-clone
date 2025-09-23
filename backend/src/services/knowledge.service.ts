import { getMongoConnection } from '../database/mongodb.js';

interface GetArticlesParams {
  page: number;
  limit: number;
  categoryId?: string;
  search?: string;
  tenantId?: string;
}

export const knowledgeService = {
  async getArticles({ page, limit, categoryId, search, tenantId }: GetArticlesParams) {
    const mongoose = getMongoConnection();
    
    const Article = mongoose.model('Article');
    const query: any = {};
    
    if (tenantId) query.tenantId = tenantId;
    if (categoryId) query.categoryId = categoryId;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const [articles, total] = await Promise.all([
      Article.find(query)
        .populate('authorId', 'firstName lastName email')
        .populate('categoryId', 'name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
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
  },

  async getArticle(id: string, tenantId?: string) {
    const mongoose = getMongoConnection();
    
    const Article = mongoose.model('Article');
    const query: any = { _id: id };
    if (tenantId) query.tenantId = tenantId;

    const article = await Article.findOne(query)
      .populate('authorId', 'firstName lastName email')
      .populate('categoryId', 'name');

    if (!article) {
      throw new Error('Article not found');
    }

    return article;
  },

  async createArticle(data: any) {
    const mongoose = getMongoConnection();
    
    const Article = mongoose.model('Article');
    const article = new Article({
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      tags: data.tags || [],
      isPublished: data.isPublished || false,
      authorId: data.authorId,
      tenantId: data.tenantId
    });

    await article.save();
    return await article.populate('authorId', 'firstName lastName email');
  },

  async updateArticle(id: string, updateData: any, tenantId?: string) {
    const mongoose = getMongoConnection();
    
    const Article = mongoose.model('Article');
    const query: any = { _id: id };
    if (tenantId) query.tenantId = tenantId;

    const article = await Article.findOneAndUpdate(
      query,
      {
        title: updateData.title,
        content: updateData.content,
        categoryId: updateData.categoryId,
        tags: updateData.tags,
        isPublished: updateData.isPublished
      },
      { new: true }
    ).populate('authorId', 'firstName lastName email')
     .populate('categoryId', 'name');

    if (!article) {
      throw new Error('Article not found');
    }

    return article;
  },

  async deleteArticle(id: string, tenantId?: string) {
    const mongoose = getMongoConnection();
    
    const Article = mongoose.model('Article');
    const query: any = { _id: id };
    if (tenantId) query.tenantId = tenantId;

    const result = await Article.deleteOne(query);
    if (result.deletedCount === 0) {
      throw new Error('Article not found');
    }
  },

  async getCategories(tenantId?: string) {
    const mongoose = getMongoConnection();
    
    const Category = mongoose.model('Category');
    const query: any = {};
    if (tenantId) query.tenantId = tenantId;

    const categories = await Category.find(query).sort({ name: 1 });
    return categories;
  },

  async createCategory(data: any) {
    const mongoose = getMongoConnection();
    
    const Category = mongoose.model('Category');
    const category = new Category({
      name: data.name,
      description: data.description,
      tenantId: data.tenantId
    });

    await category.save();
    return category;
  },

  async updateCategory(id: string, updateData: any, tenantId?: string) {
    const mongoose = getMongoConnection();
    
    const Category = mongoose.model('Category');
    const query: any = { _id: id };
    if (tenantId) query.tenantId = tenantId;

    const category = await Category.findOneAndUpdate(
      query,
      {
        name: updateData.name,
        description: updateData.description
      },
      { new: true }
    );

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  },

  async deleteCategory(id: string, tenantId?: string) {
    const mongoose = getMongoConnection();
    
    const Category = mongoose.model('Category');
    const query: any = { _id: id };
    if (tenantId) query.tenantId = tenantId;

    const result = await Category.deleteOne(query);
    if (result.deletedCount === 0) {
      throw new Error('Category not found');
    }
  },

  async searchArticles({ query, categoryId, page, limit, tenantId }: any) {
    const mongoose = getMongoConnection();
    
    const Article = mongoose.model('Article');
    const searchQuery: any = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    };
    
    if (tenantId) searchQuery.tenantId = tenantId;
    if (categoryId) searchQuery.categoryId = categoryId;

    const [articles, total] = await Promise.all([
      Article.find(searchQuery)
        .populate('authorId', 'firstName lastName email')
        .populate('categoryId', 'name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
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
  },

  async addFeedback(data: any) {
    const mongoose = getMongoConnection();
    
    const Feedback = mongoose.model('Feedback');
    const feedback = new Feedback({
      articleId: data.articleId,
      userId: data.userId,
      rating: data.rating,
      comment: data.comment,
      helpful: data.helpful
    });

    await feedback.save();
    return feedback;
  }
};
