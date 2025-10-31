#!/bin/bash

# GitLab Setup Script for SocialCrab Landing Page
echo "🚀 Setting up GitLab connection for SocialCrab Landing Page..."

# Remove any existing lock files
echo "🔧 Cleaning up Git lock files..."
rm -f .git/config.lock .git/index.lock

# Configure Git user
echo "👤 Configuring Git user..."
git config user.name "backend_socialcrab"
git config user.email "backend@socialcrab.id"

# Add GitLab remote (URL encoded password)
echo "🔗 Adding GitLab remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://backend_socialcrab:password%20012110%20gitlab.com%20socialcrab@gitlab.com/socialcrab/sc-landing-page.git"

# Check if we have any commits
if [ -z "$(git log --oneline 2>/dev/null)" ]; then
    echo "📝 Creating initial commit..."
    git add .
    git commit -m "Initial commit: SocialCrab Landing Page with Admin Dashboard

Features implemented:
✅ Complete admin dashboard with DDD architecture  
✅ MongoDB integration with blog management system
✅ React Quill WYSIWYG editor with image upload
✅ AWS S3 image storage integration
✅ Export robots.txt and sitemap.xml for SEO
✅ Category-based blog filtering in admin
✅ JWT cookie authentication system
✅ CRUD operations for blog management
✅ Responsive admin interface with Preline design

Tech Stack:
- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Express.js + TypeScript + MongoDB
- Authentication: JWT with HTTP-only cookies
- File Storage: AWS S3
- Architecture: Domain-Driven Design (DDD)

Admin Access:
- URL: /admin/login
- Username: admin  
- Password: admin123
"
else
    echo "📝 Adding current changes..."
    git add .
    git commit -m "Update: Latest changes to SocialCrab landing page and admin dashboard

- Export robots.txt and sitemap.xml functionality
- Category filtering for blog management
- AWS S3 image upload integration
- WYSIWYG editor improvements
- Authentication fixes
- DDD architecture implementation
"
fi

# Push to GitLab
echo "🚀 Pushing to GitLab..."
git push -u origin main

echo "✅ GitLab setup complete!"
echo "📍 Repository: https://gitlab.com/socialcrab/sc-landing-page"
echo "👤 User: backend_socialcrab"
echo ""
echo "🎯 Next steps:"
echo "1. Visit GitLab repository to verify upload"
echo "2. Configure CI/CD pipelines if needed"
echo "3. Set up branch protection rules"
echo "4. Add team members as needed"