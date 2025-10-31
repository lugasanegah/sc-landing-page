const mongoose = require('mongoose');

// MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://socialcrab:tnIVUbYyvAE1MDQM@socialcrab.ltkik8o.mongodb.net/socialcrab');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Blog schema
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  excerpt: { type: String, required: true, trim: true, maxlength: 500 },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  author: { type: String, required: true },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
  isSticky: { type: Boolean, default: false },
  seoTitle: { type: String, trim: true, maxlength: 60 },
  seoDescription: { type: String, trim: true, maxlength: 160 }
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

// Sample blog data
const blogData = [
  {
    title: "How AI is Revolutionizing Social Media Analytics in 2024",
    content: `
      <h2>The Rise of AI in Social Media Analytics</h2>
      <p>Artificial Intelligence has fundamentally transformed how we analyze social media data. With billions of posts generated daily across platforms like Instagram, Twitter, TikTok, and LinkedIn, traditional analytics methods simply can't keep up with the volume and complexity of modern social media data.</p>
      
      <h3>Advanced Sentiment Analysis</h3>
      <p>Modern AI systems can now understand context, sarcasm, and cultural nuances in social media posts. This means more accurate sentiment analysis that goes beyond simple positive/negative classifications.</p>
      
      <blockquote>
      <p>"AI-powered analytics can process and analyze social media data 10x faster than traditional methods, providing real-time insights that drive immediate business decisions."</p>
      </blockquote>
      
      <h3>Key Benefits:</h3>
      <ul>
        <li><strong>Real-time Processing:</strong> Instant analysis of millions of social media interactions</li>
        <li><strong>Deep Insights:</strong> Understanding audience behavior patterns and preferences</li>
        <li><strong>Automated Reporting:</strong> Generate comprehensive reports without manual intervention</li>
      </ul>
    `,
    excerpt: "Discover how artificial intelligence is transforming social media analytics, providing real-time insights and predictive capabilities that drive business success.",
    slug: "ai-revolutionizing-social-media-analytics-2024",
    category: "AI & Technology",
    status: "published",
    author: "Sarah Chen",
    featuredImage: "https://socialcrab.s3.ap-southeast-1.amazonaws.com/blog/ai-analytics.svg"
  },
  {
    title: "Instagram Engagement Strategies That Actually Work",
    content: `
      <h2>Understanding Instagram's Algorithm</h2>
      <p>Instagram's algorithm prioritizes content that generates meaningful interactions. The platform considers factors like saves, shares, comments, and time spent viewing content when determining reach and visibility.</p>
      
      <h3>Proven Engagement Strategies:</h3>
      <ol>
        <li><strong>Ask Questions:</strong> Posts with questions receive 15% more comments</li>
        <li><strong>Use Instagram Stories:</strong> Stories receive 10x more engagement than regular posts</li>
        <li><strong>Collaborate with Micro-Influencers:</strong> Better ROI than celebrity endorsements</li>
      </ol>
    `,
    excerpt: "Learn proven Instagram engagement strategies that boost your reach, increase followers, and drive meaningful interactions with your audience.",
    slug: "instagram-engagement-strategies-that-work",
    category: "Social Media Marketing",
    status: "published",
    author: "Marcus Rodriguez",
    featuredImage: "https://socialcrab.s3.ap-southeast-1.amazonaws.com/blog/instagram-engagement.svg"
  },
  {
    title: "The Complete Guide to TikTok Analytics for Brands",
    content: `
      <h2>Why TikTok Analytics Matter</h2>
      <p>With over 1 billion active users, TikTok has become a critical platform for brand marketing. Understanding TikTok analytics is essential for creating viral content and reaching younger audiences effectively.</p>
      
      <h3>Essential TikTok Metrics:</h3>
      <ul>
        <li><strong>Video Views:</strong> Total number of times your video was watched</li>
        <li><strong>Average Watch Time:</strong> How long viewers watch your content</li>
        <li><strong>Follower Activity:</strong> When your followers are most active</li>
      </ul>
    `,
    excerpt: "Master TikTok analytics to create viral content, understand your audience, and drive brand growth on the world's fastest-growing social platform.",
    slug: "complete-guide-tiktok-analytics-brands",
    category: "Analytics & Insights",
    status: "published",
    author: "Jessica Park",
    featuredImage: "https://socialcrab.s3.ap-southeast-1.amazonaws.com/blog/tiktok-analytics.svg"
  }
];

async function seedBlogs() {
  try {
    await connectMongoDB();
    
    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');
    
    // Create blogs
    for (const blogItem of blogData) {
      console.log(`Creating blog: ${blogItem.title}`);
      
      const blog = new Blog(blogItem);
      await blog.save();
      
      console.log(`✅ Created blog: ${blog.title}`);
    }
    
    console.log(`🎉 Successfully created ${blogData.length} blog posts!`);
    console.log('🚀 Seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeder
seedBlogs();