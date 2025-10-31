import { connectMongoDB } from "../db/mongodb";
import { Blog } from "../models/Blog";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Configure AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'socialcrab';

// Sample blog data about social media analytics
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
      
      <h3>Predictive Trend Forecasting</h3>
      <p>Machine learning algorithms can identify emerging trends before they go viral, giving brands a competitive advantage in content creation and marketing strategies.</p>
      
      <h3>Key Benefits:</h3>
      <ul>
        <li><strong>Real-time Processing:</strong> Instant analysis of millions of social media interactions</li>
        <li><strong>Deep Insights:</strong> Understanding audience behavior patterns and preferences</li>
        <li><strong>Automated Reporting:</strong> Generate comprehensive reports without manual intervention</li>
        <li><strong>Cross-Platform Integration:</strong> Unified analytics across all social media platforms</li>
      </ul>
      
      <p>Companies using AI-powered social media analytics report 40% improvement in engagement rates and 25% increase in ROI from their social media marketing efforts.</p>
    `,
    excerpt: "Discover how artificial intelligence is transforming social media analytics, providing real-time insights and predictive capabilities that drive business success.",
    slug: "ai-revolutionizing-social-media-analytics-2024",
    category: "AI & Technology",
    status: "published",
    author: "Sarah Chen",
    imageKeyword: "ai-analytics"
  },
  {
    title: "Instagram Engagement Strategies That Actually Work",
    content: `
      <h2>Understanding Instagram's Algorithm</h2>
      <p>Instagram's algorithm prioritizes content that generates meaningful interactions. The platform considers factors like saves, shares, comments, and time spent viewing content when determining reach and visibility.</p>
      
      <h3>Content Timing and Frequency</h3>
      <p>Analytics show that posting between 11 AM - 1 PM and 7 PM - 9 PM typically yields the highest engagement rates. However, this varies significantly by audience demographics and industry.</p>
      
      <h3>Visual Storytelling Techniques</h3>
      <p>Instagram is inherently visual. Brands that master visual storytelling see 23% higher engagement rates compared to those using generic stock photos.</p>
      
      <h3>Proven Engagement Strategies:</h3>
      <ol>
        <li><strong>Ask Questions:</strong> Posts with questions receive 15% more comments</li>
        <li><strong>Use Instagram Stories:</strong> Stories receive 10x more engagement than regular posts</li>
        <li><strong>Collaborate with Micro-Influencers:</strong> Better ROI than celebrity endorsements</li>
        <li><strong>Create User-Generated Content:</strong> UGC campaigns increase brand trust by 35%</li>
        <li><strong>Optimize Hashtags:</strong> Use 9-11 hashtags for maximum reach</li>
      </ol>
      
      <blockquote>
      <p>"The key to Instagram success isn't just posting beautiful images—it's creating content that encourages meaningful interactions and builds community."</p>
      </blockquote>
      
      <p>Brands that implement these strategies consistently see 45% increase in follower growth and 60% improvement in engagement rates within three months.</p>
    `,
    excerpt: "Learn proven Instagram engagement strategies that boost your reach, increase followers, and drive meaningful interactions with your audience.",
    slug: "instagram-engagement-strategies-that-work",
    category: "Social Media Marketing",
    status: "published",
    author: "Marcus Rodriguez",
    imageKeyword: "instagram-engagement"
  },
  {
    title: "The Complete Guide to TikTok Analytics for Brands",
    content: `
      <h2>Why TikTok Analytics Matter</h2>
      <p>With over 1 billion active users, TikTok has become a critical platform for brand marketing. Understanding TikTok analytics is essential for creating viral content and reaching younger audiences effectively.</p>
      
      <h3>Key TikTok Metrics to Track</h3>
      <p>TikTok provides unique metrics that differ from other social platforms. Understanding these metrics helps brands optimize their content strategy.</p>
      
      <h3>Essential TikTok Metrics:</h3>
      <ul>
        <li><strong>Video Views:</strong> Total number of times your video was watched</li>
        <li><strong>Average Watch Time:</strong> How long viewers watch your content</li>
        <li><strong>Traffic Source Types:</strong> Where your viewers discovered your content</li>
        <li><strong>Audience Territories:</strong> Geographic distribution of your audience</li>
        <li><strong>Follower Activity:</strong> When your followers are most active</li>
      </ul>
      
      <h3>Creating Viral TikTok Content</h3>
      <p>Analysis of viral TikTok videos reveals common patterns: they typically hook viewers within the first 3 seconds, use trending sounds or hashtags, and follow popular video formats.</p>
      
      <blockquote>
      <p>"TikTok's algorithm rewards content that keeps viewers engaged. The key is to create content that encourages completion and rewatching."</p>
      </blockquote>
      
      <h3>Brand Success Stories</h3>
      <p>Brands like Chipotle, Gymshark, and Duolingo have leveraged TikTok analytics to create campaigns that generated millions of views and significantly increased brand awareness among Gen Z consumers.</p>
      
      <p>Companies using TikTok analytics strategically report 3x higher engagement rates and 85% increase in brand awareness among 16-24 age demographic.</p>
    `,
    excerpt: "Master TikTok analytics to create viral content, understand your audience, and drive brand growth on the world's fastest-growing social platform.",
    slug: "complete-guide-tiktok-analytics-brands",
    category: "Analytics & Insights",
    status: "published",
    author: "Jessica Park",
    imageKeyword: "tiktok-analytics"
  },
  {
    title: "LinkedIn Analytics: B2B Social Media Success Metrics",
    content: `
      <h2>LinkedIn's Professional Network Advantage</h2>
      <p>LinkedIn's professional focus makes it the most effective platform for B2B marketing, with 97% of B2B marketers using it for organic social marketing and 59% saying it generates leads.</p>
      
      <h3>LinkedIn Analytics Dashboard Overview</h3>
      <p>LinkedIn provides comprehensive analytics for both personal profiles and company pages, offering insights into follower demographics, content performance, and engagement patterns.</p>
      
      <h3>Critical LinkedIn Metrics:</h3>
      <ul>
        <li><strong>Impression Rate:</strong> How often your content appears in feeds</li>
        <li><strong>Click-through Rate:</strong> Percentage of viewers who click your links</li>
        <li><strong>Engagement Rate:</strong> Likes, comments, shares, and follows per impression</li>
        <li><strong>Follower Demographics:</strong> Industry, seniority, company size, and location</li>
        <li><strong>Content Performance:</strong> Which post types generate most engagement</li>
      </ul>
      
      <h3>B2B Content Strategy</h3>
      <p>LinkedIn content that performs best includes industry insights, thought leadership articles, company updates, and employee-generated content. Video content receives 20x more shares than other post types.</p>
      
      <blockquote>
      <p>"LinkedIn is where professionals go to learn, network, and advance their careers. Content should provide value, insights, and professional growth opportunities."</p>
      </blockquote>
      
      <h3>Lead Generation Through LinkedIn</h3>
      <p>Companies using LinkedIn Lead Gen Forms see 13% lower cost-per-lead compared to traditional landing pages, with pre-filled forms increasing conversion rates by 25%.</p>
      
      <p>B2B companies implementing data-driven LinkedIn strategies report 67% increase in qualified leads and 34% improvement in sales conversion rates.</p>
    `,
    excerpt: "Unlock LinkedIn's potential for B2B marketing with comprehensive analytics insights that drive lead generation and professional network growth.",
    slug: "linkedin-analytics-b2b-social-media-success",
    category: "B2B Marketing",
    status: "published",
    author: "David Kim",
    imageKeyword: "linkedin-b2b"
  },
  {
    title: "Social Media ROI: Measuring What Matters",
    content: `
      <h2>The Challenge of Social Media ROI</h2>
      <p>Measuring return on investment for social media marketing remains one of the biggest challenges for businesses. Traditional ROI metrics don't always apply to social media's complex ecosystem of awareness, engagement, and conversion.</p>
      
      <h3>Defining Social Media ROI</h3>
      <p>Social media ROI goes beyond direct sales. It includes brand awareness, customer satisfaction, lead generation, website traffic, and long-term customer lifetime value.</p>
      
      <h3>Key ROI Metrics to Track:</h3>
      <ol>
        <li><strong>Revenue Attribution:</strong> Direct sales from social media campaigns</li>
        <li><strong>Lead Quality Score:</strong> Qualification rate of social media leads</li>
        <li><strong>Customer Acquisition Cost:</strong> Cost to acquire customers through social</li>
        <li><strong>Lifetime Value:</strong> Total value of customers acquired through social media</li>
        <li><strong>Brand Awareness Lift:</strong> Increase in brand recognition and recall</li>
      </ol>
      
      <h3>Advanced Attribution Models</h3>
      <p>Multi-touch attribution helps understand the complete customer journey across social platforms, providing more accurate ROI calculations than last-click attribution alone.</p>
      
      <blockquote>
      <p>"Social media ROI isn't just about immediate sales—it's about building relationships, trust, and brand equity that drive long-term business growth."</p>
      </blockquote>
      
      <h3>Tools and Technologies</h3>
      <p>Modern analytics platforms use AI and machine learning to provide more accurate ROI measurement, connecting social media activities to business outcomes with greater precision.</p>
      
      <p>Companies with sophisticated social media ROI measurement see 34% better marketing efficiency and 28% higher customer retention rates.</p>
    `,
    excerpt: "Learn how to accurately measure social media ROI beyond vanity metrics, focusing on business outcomes that drive real growth and profitability.",
    slug: "social-media-roi-measuring-what-matters",
    category: "Analytics & Insights",
    status: "published",
    author: "Emily Thompson",
    imageKeyword: "social-roi"
  },
  {
    title: "Twitter Analytics: Maximizing Engagement in Real-Time",
    content: `
      <h2>Twitter's Real-Time Advantage</h2>
      <p>Twitter's fast-paced environment requires real-time analytics to capitalize on trending topics, breaking news, and viral moments. Understanding Twitter analytics helps brands join conversations and build communities.</p>
      
      <h3>Essential Twitter Metrics</h3>
      <p>Twitter provides detailed analytics including impressions, engagements, profile clicks, and follower growth. The platform's unique metrics help understand audience behavior in real-time.</p>
      
      <h3>Twitter Analytics Deep Dive:</h3>
      <ul>
        <li><strong>Tweet Impressions:</strong> How many times tweets appear in timelines</li>
        <li><strong>Engagement Rate:</strong> Percentage of impressions resulting in interactions</li>
        <li><strong>Link Clicks:</strong> Traffic driven to external websites</li>
        <li><strong>Hashtag Performance:</strong> Reach and engagement of branded hashtags</li>
        <li><strong>Mention Analytics:</strong> Brand mentions and sentiment analysis</li>
      </ul>
      
      <h3>Real-Time Engagement Strategies</h3>
      <p>Successful Twitter marketing requires monitoring trends, participating in conversations, and responding quickly to customer inquiries. Brands that respond within 1 hour see 77% higher engagement.</p>
      
      <blockquote>
      <p>"Twitter is where news breaks and trends begin. Brands that master real-time engagement can achieve massive reach with strategic content timing."</p>
      </blockquote>
      
      <h3>Crisis Management and Monitoring</h3>
      <p>Twitter analytics help brands identify potential issues early, monitor sentiment during crises, and measure the effectiveness of crisis communication strategies.</p>
      
      <p>Brands actively engaging on Twitter see 67% higher website traffic and 33% increase in customer loyalty compared to brands with minimal Twitter presence.</p>
    `,
    excerpt: "Master Twitter analytics to engage in real-time conversations, capitalize on trending topics, and build a loyal community around your brand.",
    slug: "twitter-analytics-maximizing-real-time-engagement",
    category: "Social Media Marketing",
    status: "published",
    author: "Alex Johnson",
    imageKeyword: "twitter-realtime"
  },
  {
    title: "Facebook Analytics vs Google Analytics: Which Tells the Truth?",
    content: `
      <h2>The Attribution Dilemma</h2>
      <p>Marketers often notice discrepancies between Facebook Analytics and Google Analytics when measuring campaign performance. Understanding these differences is crucial for accurate reporting and budget allocation.</p>
      
      <h3>Attribution Models Explained</h3>
      <p>Facebook uses view-through attribution, crediting conversions to ads even if users didn't click. Google Analytics uses last-click attribution by default, only crediting the final touchpoint before conversion.</p>
      
      <h3>Key Differences:</h3>
      <ul>
        <li><strong>Attribution Windows:</strong> Facebook: 28-day view, 1-day click vs Google: 90-day default</li>
        <li><strong>Conversion Tracking:</strong> Facebook: Platform-specific vs Google: Cross-platform</li>
        <li><strong>Data Collection:</strong> Facebook: First-party data vs Google: Cookie-based tracking</li>
        <li><strong>Device Tracking:</strong> Facebook: Cross-device vs Google: Same-device focused</li>
      </ul>
      
      <h3>iOS 14.5 Impact on Attribution</h3>
      <p>Apple's App Tracking Transparency framework has significantly affected Facebook's attribution accuracy, leading to 15-20% underreporting of conversions for many advertisers.</p>
      
      <blockquote>
      <p>"The truth lies somewhere between both platforms. Smart marketers use multiple attribution models to get a complete picture of campaign performance."</p>
      </blockquote>
      
      <h3>Best Practices for Accurate Measurement</h3>
      <p>Implementing server-side tracking, using UTM parameters consistently, and analyzing data from multiple sources provides the most accurate picture of marketing performance.</p>
      
      <p>Businesses using multi-platform attribution see 23% improvement in marketing ROI and 31% better budget allocation efficiency.</p>
    `,
    excerpt: "Understand the key differences between Facebook and Google Analytics to make informed decisions about campaign performance and budget allocation.",
    slug: "facebook-vs-google-analytics-truth",
    category: "Analytics & Insights",
    status: "published",
    author: "Rachel Davis",
    imageKeyword: "facebook-google-analytics"
  },
  {
    title: "Social Listening: Beyond Mentions and Hashtags",
    content: `
      <h2>The Evolution of Social Listening</h2>
      <p>Modern social listening goes far beyond tracking brand mentions and hashtags. It's about understanding customer sentiment, identifying market opportunities, and predicting consumer behavior through advanced analytics.</p>
      
      <h3>Advanced Social Listening Techniques</h3>
      <p>AI-powered social listening tools can analyze context, emotion, and intent behind social media conversations, providing deeper insights than traditional keyword monitoring.</p>
      
      <h3>What to Monitor:</h3>
      <ol>
        <li><strong>Brand Sentiment:</strong> Overall perception and emotional response to your brand</li>
        <li><strong>Competitor Analysis:</strong> Market positioning and customer preferences</li>
        <li><strong>Industry Trends:</strong> Emerging topics and consumer interests</li>
        <li><strong>Influencer Identification:</strong> Key voices and opinion leaders in your industry</li>
        <li><strong>Crisis Signals:</strong> Early warning signs of potential issues</li>
      </ol>
      
      <h3>Actionable Insights from Social Listening</h3>
      <p>Social listening data can inform product development, content strategy, customer service improvements, and market expansion decisions.</p>
      
      <blockquote>
      <p>"Social listening is like having a focus group running 24/7 across the entire internet. The insights are invaluable for business strategy."</p>
      </blockquote>
      
      <h3>ROI of Social Listening</h3>
      <p>Companies investing in comprehensive social listening report 41% improvement in customer satisfaction and 28% reduction in customer service costs through proactive issue resolution.</p>
      
      <p>Brands using advanced social listening tools see 52% better crisis management response times and 36% improvement in product development success rates.</p>
    `,
    excerpt: "Discover how advanced social listening techniques provide deep customer insights that drive product development, improve customer service, and identify market opportunities.",
    slug: "social-listening-beyond-mentions-hashtags",
    category: "AI & Technology",
    status: "published",
    author: "Michael Chang",
    imageKeyword: "social-listening"
  },
  {
    title: "YouTube Analytics: Video Content Performance Mastery",
    content: `
      <h2>YouTube's Massive Reach Potential</h2>
      <p>With over 2 billion logged-in monthly users, YouTube offers unprecedented reach for video content. Understanding YouTube analytics is essential for brands looking to leverage video marketing effectively.</p>
      
      <h3>YouTube Analytics Dashboard</h3>
      <p>YouTube provides comprehensive analytics including watch time, audience retention, traffic sources, and revenue metrics for monetized channels.</p>
      
      <h3>Critical YouTube Metrics:</h3>
      <ul>
        <li><strong>Watch Time:</strong> Total minutes viewers spend watching your content</li>
        <li><strong>Audience Retention:</strong> Percentage of video watched by viewers</li>
        <li><strong>Click-through Rate:</strong> Thumbnail and title effectiveness</li>
        <li><strong>Subscriber Growth:</strong> Rate of channel subscription from videos</li>
        <li><strong>Revenue Metrics:</strong> Ad revenue, channel memberships, Super Chat</li>
      </ul>
      
      <h3>Optimizing for YouTube's Algorithm</h3>
      <p>YouTube's algorithm prioritizes videos that keep viewers on the platform longer. Content with high audience retention and engagement signals gets recommended more frequently.</p>
      
      <blockquote>
      <p>"YouTube success is about creating content that not only attracts viewers but keeps them watching until the end and wanting more."</p>
      </blockquote>
      
      <h3>Video SEO and Discovery</h3>
      <p>YouTube is the world's second-largest search engine. Optimizing titles, descriptions, tags, and thumbnails for search helps videos get discovered by target audiences.</p>
      
      <p>Channels using YouTube analytics strategically see 73% higher subscriber growth and 45% increase in video views compared to those relying on intuition alone.</p>
    `,
    excerpt: "Master YouTube analytics to create engaging video content, grow your subscriber base, and maximize your channel's reach and revenue potential.",
    slug: "youtube-analytics-video-content-mastery",
    category: "Video Marketing",
    status: "published",
    author: "Lisa Wang",
    imageKeyword: "youtube-analytics"
  },
  {
    title: "Cross-Platform Social Media Analytics: The Complete Picture",
    content: `
      <h2>The Multi-Platform Reality</h2>
      <p>Modern consumers use multiple social media platforms throughout their customer journey. Understanding cross-platform analytics provides a complete picture of audience behavior and marketing effectiveness.</p>
      
      <h3>Platform-Specific Behaviors</h3>
      <p>Each social platform serves different purposes in the customer journey. Instagram for discovery, YouTube for education, LinkedIn for professional content, and Twitter for real-time engagement.</p>
      
      <h3>Unified Analytics Approach:</h3>
      <ol>
        <li><strong>Cross-Platform Attribution:</strong> Understanding multi-touch customer journeys</li>
        <li><strong>Audience Overlap:</strong> Identifying users active across multiple platforms</li>
        <li><strong>Content Performance:</strong> Comparing effectiveness across platforms</li>
        <li><strong>Budget Allocation:</strong> Optimizing spend based on platform ROI</li>
        <li><strong>Message Consistency:</strong> Ensuring brand coherence across channels</li>
      </ol>
      
      <h3>Advanced Analytics Tools</h3>
      <p>Third-party analytics platforms aggregate data from multiple social networks, providing unified dashboards and cross-platform insights that individual platform analytics can't offer.</p>
      
      <blockquote>
      <p>"The customer journey doesn't happen on a single platform. Neither should your analytics strategy."</p>
      </blockquote>
      
      <h3>Building a Comprehensive Strategy</h3>
      <p>Successful cross-platform strategies use platform strengths while maintaining consistent brand messaging and leveraging audience data for more effective targeting.</p>
      
      <p>Brands with integrated cross-platform analytics strategies see 58% better customer lifetime value and 42% higher marketing efficiency compared to single-platform approaches.</p>
    `,
    excerpt: "Learn how to implement cross-platform social media analytics to understand the complete customer journey and optimize your multi-channel marketing strategy.",
    slug: "cross-platform-social-media-analytics-complete-picture",
    category: "Analytics & Insights",
    status: "published",
    author: "Thomas Anderson",
    imageKeyword: "cross-platform-analytics"
  }
];

// Function to upload image to S3
async function uploadImageToS3(imageKeyword: string): Promise<string> {
  // For demo purposes, we'll create a simple colored rectangle as image
  // In production, you would fetch real images
  const imageName = `${imageKeyword}-${Date.now()}.png`;
  const s3Key = `blog/${imageName}`;
  
  // Create a simple SVG image with text
  const svgContent = `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#3B82F6"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
            fill="white" font-size="32" font-family="Arial, sans-serif">
        ${imageKeyword.replace('-', ' ').toUpperCase()}
      </text>
    </svg>
  `;
  
  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: Buffer.from(svgContent),
      ContentType: 'image/svg+xml',
    });

    await s3Client.send(uploadCommand);
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_S3_REGION || 'ap-southeast-1'}.amazonaws.com/${s3Key}`;
  } catch (error) {
    console.error(`Error uploading image ${imageName}:`, error);
    return '';
  }
}

// Function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function seedBlogs() {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    console.log('Connected to MongoDB successfully');
    
    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');
    
    // Create blogs with images
    const blogs = [];
    
    for (const blogItem of blogData) {
      console.log(`Creating blog: ${blogItem.title}`);
      
      // Upload image to S3
      const featuredImage = await uploadImageToS3(blogItem.imageKeyword);
      
      const blog = new Blog({
        title: blogItem.title,
        content: blogItem.content,
        excerpt: blogItem.excerpt,
        slug: blogItem.slug,
        category: blogItem.category,
        status: blogItem.status,
        featuredImage: featuredImage,
        author: blogItem.author,
      });
      
      await blog.save();
      blogs.push(blog);
      console.log(`✅ Created blog: ${blog.title}`);
    }
    
    console.log(`\n🎉 Successfully created ${blogs.length} blog posts!`);
    console.log('\n📊 Categories created:');
    const categories = [...new Set(blogs.map(blog => blog.category))];
    categories.forEach(category => {
      const count = blogs.filter(blog => blog.category === category).length;
      console.log(`  - ${category}: ${count} posts`);
    });
    
    console.log('\n📝 Authors:');
    const authors = [...new Set(blogs.map(blog => blog.author))];
    authors.forEach(author => {
      const count = blogs.filter(blog => blog.author === author).length;
      console.log(`  - ${author}: ${count} posts`);
    });
    
    console.log('\n🌐 All blogs have been uploaded to S3 with featured images');
    console.log('🚀 Seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedBlogs();
}

export { seedBlogs };