import { AuthRequest } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { knowledgeService } from '../services/knowledge.service.js';

export const knowledgeController = {
  getArticles: asyncHandler(async (req: AuthRequest, res: any) => {
    const { page = 1, limit = 10, categoryId, search } = req.query;
    if (!req.user?.tenantId) return res.status(400).json({ message: 'Missing tenantId' });
    const result = await knowledgeService.getArticles({
      page: Number(page),
      limit: Number(limit),
      categoryId: categoryId as string,
      search: search as string,
      tenantId: req.user?.tenantId
    });
    return res.json({
      success: true,
      data: result
    });
  }),

  getArticle: asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const article = await knowledgeService.getArticle(id, req.user?.tenantId);
    return res.json({
      success: true,
      data: article
    });
  }),

  createArticle: asyncHandler(async (req: AuthRequest, res: any) => {
    const articleData = {
      ...req.body,
      authorId: req.user?.id,
      tenantId: req.user?.tenantId
    };
    const article = await knowledgeService.createArticle(articleData);
    return res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article
    });
  }),

  updateArticle: asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const article = await knowledgeService.updateArticle(id, req.body, req.user?.tenantId);
    return res.json({
      success: true,
      message: 'Article updated successfully',
      data: article
    });
  }),

  deleteArticle: asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    await knowledgeService.deleteArticle(id, req.user?.tenantId);
    return res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  }),

  getCategories: asyncHandler(async (req: AuthRequest, res: any) => {
    const categories = await knowledgeService.getCategories(req.user?.tenantId);
    return res.json({
      success: true,
      data: categories
    });
  }),

  createCategory: asyncHandler(async (req: AuthRequest, res: any) => {
    const categoryData = {
      ...req.body,
      tenantId: req.user?.tenantId
    };
    const category = await knowledgeService.createCategory(categoryData);
    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  }),

  updateCategory: asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const category = await knowledgeService.updateCategory(id, req.body, req.user?.tenantId);
    return res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  }),

  deleteCategory: asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    await knowledgeService.deleteCategory(id, req.user?.tenantId);
    return res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  }),

  searchArticles: asyncHandler(async (req: AuthRequest, res: any) => {
    const { q, categoryId, page = 1, limit = 10 } = req.query;
    const result = await knowledgeService.searchArticles({
      query: q as string,
      categoryId: categoryId as string,
      page: Number(page),
      limit: Number(limit),
      tenantId: req.user?.tenantId
    });
    return res.json({
      success: true,
      data: result
    });
  }),

  addFeedback: asyncHandler(async (req: AuthRequest, res: any) => {
    const { id } = req.params;
    const feedbackData = {
      ...req.body,
      articleId: id,
      userId: req.user?.id
    };
    const feedback = await knowledgeService.addFeedback(feedbackData);
    return res.status(201).json({
      success: true,
      message: 'Feedback added successfully',
      data: feedback
    });
  })
};
