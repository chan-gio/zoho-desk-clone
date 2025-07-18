import { Request, Response, NextFunction } from 'express';
import { ArticleService } from '../services/article.service';

const articleService = new ArticleService();

export class ArticleController {
  async create(req: Request, res: Response, _next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const tenantId = (req as any).user?.tenantId;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });
      if (!tenantId) return res.status(400).json({ message: 'Missing tenantId' });
      const article = await articleService.createArticle({
        ...req.body,
        author: userId,
        tenantId
      });
      res.status(201).json(article);
    } catch (err) {
      console.error('ArticleController.create error:', err);
      if (err instanceof Error) {
        return res.status(500).json({ success: false, message: err.message, stack: err.stack });
      }
      res.status(500).json({ success: false, message: 'Unknown error', error: err });
    }
  }

  async getById(req: Request, res: Response, _next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const article = await articleService.getArticleById(req.params.id, tenantId);
      if (!article) return res.status(404).json({ message: 'Article not found' });
      res.json(article);
    } catch (err) {
      console.error('ArticleController.getById error:', err);
      if (err instanceof Error) {
        return res.status(500).json({ success: false, message: err.message, stack: err.stack });
      }
      res.status(500).json({ success: false, message: 'Unknown error', error: err });
    }
  }

  async update(req: Request, res: Response, _next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const article = await articleService.updateArticle(req.params.id, tenantId, req.body);
      if (!article) return res.status(404).json({ message: 'Article not found' });
      res.json(article);
    } catch (err) {
      console.error('ArticleController.update error:', err);
      if (err instanceof Error) {
        return res.status(500).json({ success: false, message: err.message, stack: err.stack });
      }
      res.status(500).json({ success: false, message: 'Unknown error', error: err });
    }
  }

  async delete(req: Request, res: Response, _next: NextFunction) {
    try {
      const tenantId = (req as any).user?.tenantId;
      const article = await articleService.deleteArticle(req.params.id, tenantId);
      if (!article) return res.status(404).json({ message: 'Article not found' });
      res.status(204).send();
    } catch (err) {
      console.error('ArticleController.delete error:', err);
      if (err instanceof Error) {
        return res.status(500).json({ success: false, message: err.message, stack: err.stack });
      }
      res.status(500).json({ success: false, message: 'Unknown error', error: err });
    }
  }

  async list(req: Request, res: Response, _next: NextFunction) {
    try {
      const { page = 1, limit = 10, ...filter } = req.query;
      const tenantId = (req as any).user?.tenantId;
      const result = await articleService.listArticles(
        tenantId,
        filter,
        Number(page),
        Number(limit)
      );
      res.json(result);
    } catch (err) {
      console.error('ArticleController.list error:', err);
      if (err instanceof Error) {
        return res.status(500).json({ success: false, message: err.message, stack: err.stack });
      }
      res.status(500).json({ success: false, message: 'Unknown error', error: err });
    }
  }

  async search(req: Request, res: Response, _next: NextFunction) {
    try {
      const { keyword, page = 1, limit = 10 } = req.query;
      const tenantId = (req as any).user?.tenantId;
      if (!keyword) return res.status(400).json({ message: 'Missing keyword' });
      const result = await articleService.searchArticles(
        tenantId,
        String(keyword),
        Number(page),
        Number(limit)
      );
      res.json(result);
    } catch (err) {
      console.error('ArticleController.search error:', err);
      if (err instanceof Error) {
        return res.status(500).json({ success: false, message: err.message, stack: err.stack });
      }
      res.status(500).json({ success: false, message: 'Unknown error', error: err });
    }
  }
} 