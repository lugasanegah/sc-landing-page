import { Request, Response } from 'express';
import { Blog } from '../models/Blog';

export const generateRobotsTxt = async (req: Request, res: Response) => {
  try {
    // Get all published blogs
    const blogs = await Blog.find({ 
      status: 'published',
      isActive: true 
    }).select('slug title category createdAt');

    // Generate robots.txt content
    let robotsContent = `# Robots.txt for SocialCrab Blog
# Generated on: ${new Date().toISOString()}

User-agent: *
Allow: /

# Blog URLs
`;

    // Add each blog URL
    blogs.forEach(blog => {
      robotsContent += `Allow: /blog/${blog.slug}\n`;
    });

    // Add sitemap reference
    robotsContent += `\n# Sitemap
Sitemap: https://socialcrab.id/sitemap.xml

# Blog categories
`;

    // Get unique categories
    const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
    categories.forEach(category => {
      robotsContent += `Allow: /blog/category/${category.toLowerCase().replace(/\s+/g, '-')}\n`;
    });

    // Set appropriate headers for file download
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="robots.txt"');
    
    res.send(robotsContent);
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate robots.txt'
    });
  }
};

export const generateSitemap = async (req: Request, res: Response) => {
  try {
    // Get all published blogs
    const blogs = await Blog.find({ 
      status: 'published',
      isActive: true 
    }).select('slug title category createdAt updatedAt');

    // Generate XML sitemap
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Main pages -->
  <url>
    <loc>https://socialcrab.id/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://socialcrab.id/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog posts -->
`;

    blogs.forEach(blog => {
      const lastmod = blog.updatedAt || blog.createdAt;
      sitemapContent += `  <url>
    <loc>https://socialcrab.id/blog/${blog.slug}</loc>
    <lastmod>${lastmod.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    sitemapContent += `</urlset>`;

    // Set appropriate headers for XML
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename="sitemap.xml"');
    
    res.send(sitemapContent);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate sitemap'
    });
  }
};