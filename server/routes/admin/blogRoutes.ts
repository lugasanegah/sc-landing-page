import { Router } from 'express';
import { 
  getAllBlogs, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  getCategories, 
  getDashboardStats,
  blogValidation 
} from '../../controllers/blogController';
import { generateRobotsTxt, generateSitemap } from '../../controllers/robotsController';
import { authenticateAdmin } from '../../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateAdmin);

// Dashboard stats
router.get('/dashboard/stats', getDashboardStats);

// SEO Export routes
router.get('/export/robots', generateRobotsTxt);
router.get('/export/sitemap', generateSitemap);

// Blog CRUD routes
router.get('/', getAllBlogs);
router.get('/categories', getCategories);
router.get('/:id', getBlogById);
router.post('/', blogValidation, createBlog);
router.put('/:id', blogValidation, updateBlog);
router.delete('/:id', deleteBlog);

export default router;