# SocialCrab Landing Page

Comprehensive blog management platform with robust admin dashboard and content creation tools untuk SocialCrab - platform analitik media sosial terdepan.

## 🚀 Features

### ✅ Admin Dashboard
- **JWT Authentication** dengan cookie-based sessions
- **Blog Management** - Create, Read, Update, Delete
- **Category Filtering** - Filter blog berdasarkan kategori
- **Dashboard Statistics** - Overview blog dan metrics
- **User Management** - Admin user controls

### ✅ WYSIWYG Editor
- **React Quill Editor** dengan toolbar lengkap
- **AWS S3 Image Upload** - Upload gambar langsung dalam editor
- **Rich Text Formatting** - Heading, lists, links, blockquotes
- **Image Management** - Drag & drop image upload

### ✅ SEO Tools
- **Export robots.txt** - Ready untuk Google Search Console
- **Generate sitemap.xml** - Automatic sitemap generation
- **SEO Optimization** - Meta titles, descriptions
- **URL Slug Management** - SEO-friendly URLs

### ✅ Content Management
- **Blog Categories** - Organize content by categories
- **Status Management** - Draft, Published, Archived
- **Search Functionality** - Full-text search across content
- **Pagination** - Efficient content browsing

## 🏗️ Architecture

### Domain-Driven Design (DDD)
```
├── client/src/domains/
│   ├── admin/          # Admin dashboard & blog management
│   ├── auth/           # Authentication system
│   ├── landing/        # Landing page components  
│   ├── pricing/        # Pricing section
│   └── shared/         # Shared components & utilities
├── server/
│   ├── controllers/    # Business logic
│   ├── models/         # MongoDB models
│   ├── middleware/     # Auth & validation
│   ├── routes/         # API endpoints
│   └── config/         # AWS & database configuration
└── shared/             # Shared types & schemas
```

### Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript + Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **File Storage**: AWS S3 (region: ap-southeast-1)
- **Editor**: React Quill WYSIWYG
- **UI Library**: shadcn/ui + Preline components

## 🔧 Setup & Installation

### Prerequisites
- Node.js 20+
- MongoDB database
- AWS S3 credentials

### Environment Variables
```bash
# Database
DATABASE_URL=mongodb+srv://socialcrab:tnIVUbYyvAE1MDQM@socialcrab.ltkik8o.mongodb.net/socialcrab

# AWS S3
AWS_API_KEY=your-aws-api-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=ap-southeast-1
AWS_BUCKET_NAME=socialcrab

# Authentication
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Database migration
npm run db:push
```

## 🎯 Admin Access

### Login Credentials
- **URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@socialcrab.id`

### Admin Features
1. **Dashboard** - Statistics dan overview
2. **Blog Management** - CRUD operations
3. **Category Management** - Organize content
4. **SEO Tools** - Export robots.txt & sitemap
5. **Image Upload** - AWS S3 integration

## 📊 API Endpoints

### Authentication
```
POST /api/admin/auth/login    # Admin login
POST /api/admin/auth/logout   # Admin logout
GET  /api/admin/auth/profile  # Get admin profile
```

### Blog Management
```
GET    /api/admin/blogs                    # Get all blogs (with filters)
GET    /api/admin/blogs/:id               # Get single blog
POST   /api/admin/blogs                   # Create new blog
PUT    /api/admin/blogs/:id               # Update blog
DELETE /api/admin/blogs/:id               # Delete blog
GET    /api/admin/blogs/categories        # Get all categories
GET    /api/admin/blogs/dashboard/stats   # Dashboard statistics
```

### SEO Tools
```
GET /api/admin/blogs/export/robots    # Download robots.txt
GET /api/admin/blogs/export/sitemap   # Download sitemap.xml
```

### File Upload
```
POST /api/admin/upload/image    # Upload image to S3
```

## 🔐 Security Features

- **JWT Authentication** dengan HTTP-only cookies
- **Rate Limiting** untuk login attempts
- **Input Validation** dengan express-validator
- **XSS Protection** dengan sanitized content
- **CORS Configuration** untuk secure API access
- **Password Hashing** dengan bcryptjs

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching
- **Loading States** - Skeleton screens
- **Error Handling** - User-friendly error messages
- **Notifications** - Toast notifications untuk actions
- **Pagination** - Efficient data loading

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page dengan hero, features, pricing
- `/pricing` - Detailed pricing plans
- `/about` - About SocialCrab

### Admin Routes  
- `/admin/login` - Admin authentication
- `/admin` - Dashboard dengan statistics
- `/admin/blogs` - Blog list dengan filtering
- `/admin/blogs/create` - Create new blog post
- `/admin/blogs/:id` - View blog details
- `/admin/blogs/:id/edit` - Edit blog post

## 🚀 Deployment

### GitLab Repository
```bash
# Setup GitLab connection
./setup_gitlab.sh

# Manual setup
git remote add origin https://gitlab.com/socialcrab/sc-landing-page.git
git push -u origin main
```

### Production Checklist
- [ ] Environment variables configured
- [ ] AWS S3 bucket permissions set
- [ ] MongoDB connection secured
- [ ] JWT secrets generated
- [ ] SSL certificates installed
- [ ] Rate limiting configured

## 🧪 Testing

### Admin Dashboard Testing
1. Login dengan credentials default
2. Create blog post dengan images
3. Test category filtering
4. Export robots.txt dan sitemap.xml
5. Test WYSIWYG editor functionality

### Image Upload Testing
1. Upload image dalam blog editor
2. Verify S3 storage
3. Test image preview
4. Check file size limits

## 📈 Future Enhancements

- [ ] **Multi-language Support** - Indonesian & English
- [ ] **Advanced Analytics** - Blog performance metrics
- [ ] **Comment System** - User engagement
- [ ] **Email Notifications** - Blog updates
- [ ] **Social Media Integration** - Auto-posting
- [ ] **Advanced SEO** - Schema markup
- [ ] **Content Scheduling** - Publish scheduling
- [ ] **Media Library** - Advanced file management

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch  
5. Create Pull Request

## 📞 Support

- **Email**: backend@socialcrab.id
- **GitLab**: https://gitlab.com/socialcrab/sc-landing-page
- **Documentation**: See `/docs` folder

---

**SocialCrab** - *Decentralized Insights, Zero Manual Work*