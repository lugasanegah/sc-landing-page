import { Router } from 'express';
import { Blog } from '../models/Blog';
import { PackageModel } from '../models/Package';

const router = Router();

// Get all published blogs for public viewing
router.get('/blogs', async (req, res) => {
  try {
    const { search, category, limit = 20, page = 1 } = req.query;
    
    const query: any = { status: 'published' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .select('title excerpt slug category status featuredImage author createdAt updatedAt');
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      blogs,
      pagination: {
        current: parseInt(page as string),
        total: Math.ceil(total / parseInt(limit as string)),
        count: blogs.length,
        totalBlogs: total
      }
    });
    
  } catch (error) {
    console.error('Error fetching public blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

// Get blog categories for public filtering
router.get('/blogs/categories', async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { status: 'published' });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// Get single blog by slug for public viewing
router.get('/blogs/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const blog = await Blog.findOne({ slug, status: 'published' });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    res.json(blog);
    
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
});

// Get related blogs by category
router.get('/blogs/related/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { exclude } = req.query;
    
    const query: any = { 
      category, 
      status: 'published' 
    };
    
    if (exclude) {
      query._id = { $ne: exclude };
    }
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(6)
      .select('title excerpt slug category featuredImage author createdAt');
    
    res.json(blogs);
    
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch related blogs' });
  }
});

// Get latest blogs for homepage
router.get('/blogs/latest', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 3;
    
    const blogs = await Blog.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title excerpt slug category featuredImage author createdAt');
    
    res.json(blogs);
    
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch latest blogs' });
  }
});

// Get all subscription packages (monthly + annually)
router.get('/packages', async (req, res) => {
  try {
    const packages = await PackageModel.find({ status: 1 }).sort({ price: 1 });

    res.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch packages' });
  }
});

export default router;