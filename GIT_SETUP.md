# GitLab Setup Instructions

## Repository Details
- **Repository URL**: https://gitlab.com/socialcrab/sc-landing-page.git
- **Username**: backend_socialcrab
- **Password**: password 012110 gitlab.com socialcrab

## Setup Commands

### 1. Configure Git (if needed)
```bash
git config user.name "backend_socialcrab"
git config user.email "backend@socialcrab.id"
```

### 2. Add GitLab Remote
```bash
git remote add origin https://backend_socialcrab:password%20012110%20gitlab.com%20socialcrab@gitlab.com/socialcrab/sc-landing-page.git
```

### 3. Add All Files
```bash
git add .
```

### 4. Commit Changes
```bash
git commit -m "Initial commit: Admin dashboard with WYSIWYG editor and AWS S3 integration

Features:
- Complete admin dashboard with DDD architecture
- MongoDB integration with blog management
- React Quill WYSIWYG editor with image upload
- AWS S3 image storage integration
- Export robots.txt and sitemap.xml for SEO
- Category-based blog filtering
- Authentication with JWT cookies
- CRUD operations for blog management
"
```

### 5. Push to GitLab
```bash
git push -u origin main
```

## Alternative Setup (if remote already exists)
```bash
git remote set-url origin https://backend_socialcrab:password%20012110%20gitlab.com%20socialcrab@gitlab.com/socialcrab/sc-landing-page.git
git push -u origin main
```

## Project Structure
```
├── client/                     # Frontend React app
│   ├── src/
│   │   ├── domains/           # DDD architecture
│   │   │   ├── admin/         # Admin dashboard
│   │   │   ├── auth/          # Authentication
│   │   │   ├── landing/       # Landing page
│   │   │   ├── pricing/       # Pricing section
│   │   │   └── shared/        # Shared components
│   │   └── lib/               # Utilities
├── server/                    # Backend Express app
│   ├── controllers/           # Route controllers
│   ├── models/               # MongoDB models
│   ├── middleware/           # Auth middleware
│   ├── routes/               # API routes
│   └── config/               # AWS and DB config
├── shared/                   # Shared types/schemas
└── README.md
```

## Features Implemented
1. ✅ Admin Dashboard with JWT Authentication
2. ✅ Blog CRUD Operations
3. ✅ WYSIWYG Editor (React Quill)
4. ✅ AWS S3 Image Upload
5. ✅ Export robots.txt for Google Console
6. ✅ Category-based Blog Filtering
7. ✅ MongoDB Integration
8. ✅ DDD Architecture