import { Category, ICategory } from '../models/category.model';
import { FilterQuery, UpdateQuery } from 'mongoose';

export class CategoryService {
  async createCategory(data: Partial<ICategory>): Promise<ICategory> {
    return Category.create(data);
  }

  async getCategoryById(id: string, tenantId: string): Promise<ICategory | null> {
    return Category.findOne({ _id: id, tenantId });
  }

  async updateCategory(id: string, tenantId: string, update: UpdateQuery<ICategory>): Promise<ICategory | null> {
    return Category.findOneAndUpdate({ _id: id, tenantId }, update, { new: true });
  }

  async deleteCategory(id: string, tenantId: string): Promise<ICategory | null> {
    return Category.findOneAndDelete({ _id: id, tenantId });
  }

  async listCategories(
    tenantId: string,
    filter: FilterQuery<ICategory> = {},
    page = 1,
    limit = 10
  ): Promise<{ categories: ICategory[]; total: number }> {
    const query = { ...filter, tenantId };
    const total = await Category.countDocuments(query);
    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ order: 1, name: 1 });
    return { categories, total };
  }
} 