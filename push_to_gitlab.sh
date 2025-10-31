#!/bin/bash

# GitLab Push Script for SocialCrab Landing Page
echo "🚀 Pushing SocialCrab Landing Page to GitLab..."

# Display current status
echo "📊 Current Git status:"
git status --short

# Display last commit
echo "📝 Last commit:"
git log --oneline -1

# Display remote info
echo "🔗 Current remotes:"
git remote -v

echo ""
echo "🎯 GitLab Repository Details:"
echo "URL: https://gitlab.com/socialcrab/sc-landing-page.git"
echo "Username: backend_socialcrab"
echo "Password: password 012110 gitlab.com socialcrab"
echo ""

echo "⚡ To push to GitLab, run these commands manually:"
echo ""
echo "# Remove existing origin (if any)"
echo "git remote remove origin"
echo ""
echo "# Add GitLab remote"
echo "git remote add origin https://backend_socialcrab:password%20012110%20gitlab.com%20socialcrab@gitlab.com/socialcrab/sc-landing-page.git"
echo ""
echo "# Push to GitLab"
echo "git push -u origin main"
echo ""

echo "📁 Files ready for push:"
echo "✅ Admin dashboard with DDD architecture"
echo "✅ MongoDB integration with blog management"
echo "✅ React Quill WYSIWYG editor with AWS S3"
echo "✅ Export robots.txt and sitemap.xml for SEO"
echo "✅ Category-based blog filtering"
echo "✅ JWT authentication system"
echo "✅ Complete documentation (README.md)"
echo ""

echo "🔑 Access after push:"
echo "Admin Login: /admin/login"
echo "Username: admin"
echo "Password: admin123"