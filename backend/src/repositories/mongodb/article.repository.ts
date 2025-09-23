import { Article, IArticle } from '../../models/mongodb/article.schema.js';
import { CreateArticleInput, UpdateArticleInput, ArticleFilter } from '../../models/mongodb/types.js';

export class ArticleRepository {
  async create(data: CreateArticleInput): Promise<IArticle> {
    const article = new Article(data);
    return await article.save();
  }

  async findById(id: string): Promise<IArticle | null> {
    return await Article.findById(id).exec();
  }

  async findMany(filter: ArticleFilter): Promise<IArticle[]> {
    const query: any = {
      tenantId: filter.tenantId,
      deletedAt: { $exists: false }
    };

    if (filter.categoryId) {
      query.categoryId = filter.categoryId;
    }

    if (filter.isPublished !== undefined) {
      query.isPublished = filter.isPublished;
    }

    if (filter.search) {
      query.$text = { $search: filter.search };
    }

    if (filter.tags && filter.tags.length > 0) {
      query.tags = { $in: filter.tags };
    }

    return await Article.find(query)
      .sort({ createdAt: -1 })
      .skip((filter.page - 1) * filter.limit)
      .limit(filter.limit)
      .exec();
  }

  async count(filter: ArticleFilter): Promise<number> {
    const query: any = {
      tenantId: filter.tenantId,
      deletedAt: { $exists: false }
    };

    if (filter.categoryId) {
      query.categoryId = filter.categoryId;
    }

    if (filter.isPublished !== undefined) {
      query.isPublished = filter.isPublished;
    }

    if (filter.search) {
      query.$text = { $search: filter.search };
    }

    if (filter.tags && filter.tags.length > 0) {
      query.tags = { $in: filter.tags };
    }

    return await Article.countDocuments(query).exec();
  }

  async update(id: string, data: UpdateArticleInput): Promise<IArticle | null> {
    return await Article.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await Article.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    ).exec();
    return !!result;
  }

  async incrementViewCount(id: string): Promise<IArticle | null> {
    return await Article.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    ).exec();
  }

  async findByCategory(categoryId: string, tenantId: string): Promise<IArticle[]> {
    return await Article.find({
      categoryId,
      tenantId,
      deletedAt: { $exists: false }
    }).sort({ createdAt: -1 }).exec();
  }

  async findPopular(tenantId: string, limit: number = 10): Promise<IArticle[]> {
    return await Article.find({
      tenantId,
      isPublished: true,
      deletedAt: { $exists: false }
    })
      .sort({ viewCount: -1 })
      .limit(limit)
      .exec();
  }

  async search(tenantId: string, searchTerm: string, limit: number = 20): Promise<IArticle[]> {
    return await Article.find({
      tenantId,
      isPublished: true,
      deletedAt: { $exists: false },
      $text: { $search: searchTerm }
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .exec();
  }
}
