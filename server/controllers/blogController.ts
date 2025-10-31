import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Blog } from '../models/Blog';
import { AuthRequest } from '../middleware/auth';

export const blogValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title too long'),
  body('excerpt').notEmpty().withMessage('Excerpt is required').isLength({ max: 500 }).withMessage('Excerpt too long'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
];

export const getAllBlogs = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const category = req.query.category as string;
    const search = req.query.search as string;

    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBlogById = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, blog });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, excerpt, content, category, tags, status, featuredImage, seoTitle, seoDescription, isSticky } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: 'A blog with similar title already exists'
      });
    }

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags || [],
      status: status || 'draft',
      author: req.admin?._id,
      featuredImage: featuredImage || '',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      isSticky: isSticky || false
    });

    await blog.save();
    await blog.populate('author', 'username email');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const { title, excerpt, content, category, tags, status, featuredImage, seoTitle, seoDescription, isSticky } = req.body;

    // Update slug if title changed
    if (title && title !== blog.title) {
      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');

      const existingBlog = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: 'A blog with similar title already exists'
        });
      }
      blog.slug = newSlug;
    }

    // Update fields
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (tags !== undefined) blog.tags = tags;
    if (status) blog.status = status;
    if (featuredImage !== undefined) blog.featuredImage = featuredImage;
    if (seoTitle !== undefined) blog.seoTitle = seoTitle;
    if (seoDescription !== undefined) blog.seoDescription = seoDescription;
    if (isSticky !== undefined) blog.isSticky = isSticky;

    await blog.save();
    await blog.populate('author', 'username email');

    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await Blog.distinct('category');
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const recentBlogs = await Blog.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.total || 0
      },
      recentBlogs
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};