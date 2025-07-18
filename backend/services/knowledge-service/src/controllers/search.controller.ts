import { Request, Response, NextFunction } from 'express';
import { SearchService } from '../services/search.service';

const searchService = new SearchService(process.env.ELASTIC_URL || 'http://localhost:9200');

export class SearchController {
  async searchArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword, page = 1, limit = 10 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!keyword) return res.status(400).json({ message: 'Missing keyword' });
      console.log('Elasticsearch query:', JSON.stringify({
        keyword,
        page,
        limit
      }));
      const articles = await searchService.searchArticles(
        String(keyword),
        tenantId,
        Number(page),
        Number(limit)
      );
      res.json({ articles });
    } catch (err) {
      next(err);
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
      res.json({ categories });
    } catch (err) {
      next(err);
    }
  }
} 