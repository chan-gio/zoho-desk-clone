import { Category, ICategory } from '../../models/mongodb/category.schema.js';
import { CreateCategoryInput, UpdateCategoryInput, CategoryFilter } from '../../models/mongodb/types.js';

export class CategoryRepository {
  async create(data: CreateCategoryInput): Promise<ICategory> {
    const category = new Category(data);
    return await category.save();
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id).exec();
  }

  async findMany(filter: CategoryFilter): Promise<ICategory[]> {
    const query: any = {
      tenantId: filter.tenantId,
      isActive: true
    };

    if (filter.parentId !== undefined) {
      query.parentId = filter.parentId;
    }

    if (filter.search) {
      query.$or = [
        { name: { $regex: filter.search, $options: 'i' } },
        { description: { $regex: filter.search, $options: 'i' } }
      ];
    }

    return await Category.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .skip((filter.page - 1) * filter.limit)
      .limit(filter.limit)
      .exec();
  }

  async count(filter: CategoryFilter): Promise<number> {
    const query: any = {
      tenantId: filter.tenantId,
      isActive: true
    };

    if (filter.parentId !== undefined) {
      query.parentId = filter.parentId;
    }

    if (filter.search) {
      query.$or = [
        { name: { $regex: filter.search, $options: 'i' } },
        { description: { $regex: filter.search, $options: 'i' } }
      ];
    }

    return await Category.countDocuments(query).exec();
  }

  async update(id: string, data: UpdateCategoryInput): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await Category.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    ).exec();
    return !!result;
  }

  async findByParent(parentId: string, tenantId: string): Promise<ICategory[]> {
    return await Category.find({
      parentId,
      tenantId,
      isActive: true
    }).sort({ sortOrder: 1, name: 1 }).exec();
  }

  async findRootCategories(tenantId: string): Promise<ICategory[]> {
    return await Category.find({
      tenantId,
      parentId: { $exists: false },
      isActive: true
    }).sort({ sortOrder: 1, name: 1 }).exec();
  }

  async findBySlug(slug: string, tenantId: string): Promise<ICategory | null> {
    return await Category.findOne({
      slug,
      tenantId,
      isActive: true
    }).exec();
  }

  async getCategoryTree(tenantId: string): Promise<ICategory[]> {
    const categories = await Category.find({
      tenantId,
      isActive: true
    }).sort({ sortOrder: 1, name: 1 }).exec();

    // Build tree structure
    const categoryMap = new Map<string, any & { children: any[] }>();
    const rootCategories: (any & { children: any[] })[] = [];

    // Initialize all categories with empty children array
    categories.forEach(cat => {
      categoryMap.set(cat._id.toString(), { ...cat.toObject(), children: [] });
    });

    // Build tree
    categories.forEach(cat => {
      const categoryWithChildren = categoryMap.get(cat._id.toString())!;
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(categoryWithChildren);
        }
      } else {
        rootCategories.push(categoryWithChildren);
      }
    });

    return rootCategories;
  }
}
