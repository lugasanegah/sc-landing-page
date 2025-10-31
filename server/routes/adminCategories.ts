import { Router } from 'express';
import { Blog } from '../models/Blog';

const router = Router();

// Get categories with blog counts
router.get('/stats', async (req, res) => {
  try {
    // Get all categories with blog counts
    const categoryStats = await Blog.aggregate([
      { $match: { status: { $in: ['published', 'draft'] } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { name: '$_id', count: 1, _id: 0 } },
      { $sort: { name: 1 } }
    ]);

    res.json(categoryStats);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch category statistics' 
    });
  }
});

// Create new category (by creating a sample blog or just validation)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const categoryName = name.trim();

    // Check if category already exists
    const existingCategory = await Blog.findOne({ category: categoryName });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: 'Category already exists'
      });
    }

    // Just return success - categories are created dynamically when blogs use them
    res.json({
      success: true,
      message: 'Category registered successfully',
      category: { name: categoryName, count: 0 }
    });

  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create category' 
    });
  }
});

// Update category name (update all blogs with old category)
router.put('/', async (req, res) => {
  try {
    const { oldName, newName } = req.body;

    if (!oldName || !newName || newName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Both old and new category names are required'
      });
    }

    const oldCategoryName = oldName.trim();
    const newCategoryName = newName.trim();

    // Update all blogs with the old category
    const result = await Blog.updateMany(
      { category: oldCategoryName },
      { $set: { category: newCategoryName } }
    );

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} blog posts`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update category' 
    });
  }
});

// Delete category (only if no blogs use it)
router.delete('/:name', async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.name);

    // Check if any blogs use this category
    const blogsCount = await Blog.countDocuments({ category: categoryName });

    if (blogsCount > 0) {
      return res.status(409).json({
        success: false,
        message: `Cannot delete category. ${blogsCount} blog posts are using this category.`
      });
    }

    // Category can be "deleted" (it will disappear once no blogs use it)
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete category' 
    });
  }
});

export { router as adminCategoriesRouter };