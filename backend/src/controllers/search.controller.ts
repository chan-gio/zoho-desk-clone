import { Request, Response, NextFunction } from 'express';
import { SearchService } from '../services/search.service.js';

const searchService = new SearchService();

export class SearchController {
  async searchArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword, page = 1, limit = 10 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!keyword) return res.status(400).json({ message: 'Missing keyword' });
      
      const articles = await searchService.searchArticles(
        String(keyword),
        tenantId,
        Number(page),
        Number(limit)
      );
      return res.json({ articles });
    } catch (err) {
      next(err);
      return;
    }
  }

  async searchCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword, page = 1, limit = 10 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!keyword) return res.status(400).json({ message: 'Missing keyword' });
      
      const categories = await searchService.searchCategories(
        String(keyword),
        tenantId,
        Number(page),
        Number(limit)
      );
      return res.json({ categories });
    } catch (err) {
      next(err);
      return;
    }
  }
}
