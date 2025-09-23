import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller.js';
import { CategoryController } from '../controllers/category.controller.js';
import { SearchController } from '../controllers/search.controller.js';

const router = Router();
const articleController = new ArticleController();
const categoryController = new CategoryController();
const searchController = new SearchController();

// Knowledge base routes
router.get('/articles', articleController.list.bind(articleController));
router.get('/articles/:id', articleController.getById.bind(articleController));
router.post('/articles', articleController.create.bind(articleController));
router.put('/articles/:id', articleController.update.bind(articleController));
router.delete('/articles/:id', articleController.delete.bind(articleController));

// Category routes
router.get('/categories', categoryController.list.bind(categoryController));
router.get('/categories/:id', categoryController.getById.bind(categoryController));
router.post('/categories', categoryController.create.bind(categoryController));
router.put('/categories/:id', categoryController.update.bind(categoryController));
router.delete('/categories/:id', categoryController.delete.bind(categoryController));

// Search routes
router.get('/search/articles', searchController.searchArticles.bind(searchController));
router.get('/search/categories', searchController.searchCategories.bind(searchController));

export default router;
