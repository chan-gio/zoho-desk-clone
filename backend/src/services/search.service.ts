import { Article } from '../models/mongodb/article.schema.js';
import { Category } from '../models/mongodb/category.schema.js';

export class SearchService {
  async searchArticles(
    keyword: string,
    tenantId: string,
    page = 1,
    limit = 10
  ) {
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
  }

  async searchCategories(
    keyword: string,
    tenantId: string,
    page = 1,
    limit = 10
  ) {
    const skip = (page - 1) * limit;
    
    const searchQuery = {
      tenantId,
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    };

    const [categories, total] = await Promise.all([
      Category.find(searchQuery)
        .sort({ order: 1, name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Category.countDocuments(searchQuery)
    ]);

    return {
      categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}
