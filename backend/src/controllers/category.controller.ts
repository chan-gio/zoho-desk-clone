import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service.js';

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const category = await categoryService.createCategory({
        ...req.body,
        tenantId
      });
      return res.status(201).json(category);
    } catch (err) {
      next(err);
      return;
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      const category = await categoryService.getCategoryById(id, tenantId);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.json(category);
    } catch (err) {
      next(err);
      return;
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      const category = await categoryService.updateCategory(id, tenantId, req.body);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.json(category);
    } catch (err) {
      next(err);
      return;
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Missing id parameter' });
      const tenantId = (req as any).user?.tenantId;
      const category = await categoryService.deleteCategory(id, tenantId);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
      return;
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, ...filter } = req.query;
      const tenantId = (req as any).user?.tenantId;
      const result = await categoryService.listCategories(
        tenantId,
        filter,
        Number(page),
        Number(limit)
      );
      return res.json(result);
    } catch (err) {
      next(err);
      return;
    }
  }
}
