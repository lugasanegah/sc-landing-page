# GitLab Personal Access Token - Step by Step

## Steps untuk Membuat Personal Access Token

### 1. Login ke GitLab
- Buka: https://gitlab.com
- Login dengan: `backend_socialcrab`

### 2. Navigate ke Access Tokens
- Click profile picture (top right)
- Click "Edit profile" atau "Preferences"
- Di sidebar kiri, click "Access Tokens"

### 3. Create New Token
- **Token name**: `SocialCrab-Development-Token`
- **Expiration date**: Set 1 year dari sekarang (atau no expiration)
- **Scopes** (centang yang ini):
  - ✅ `read_repository` 
  - ✅ `write_repository`
  - ✅ `read_user` (optional)

### 4. Create Token
- Click "Create personal access token"
- **IMPORTANT**: Copy token immediately (tidak bisa dilihat lagi!)
- Token format akan seperti: `glpat-xxxxxxxxxxxxxxxxxxxx`

### 5. Setup Git Remote dengan Token
```bash
# Remove existing remote (if any)
git remote remove origin

# Add new remote dengan token
git remote add origin https://backend_socialcrab:glpat-YOUR_TOKEN_HERE@gitlab.com/socialcrab/sc-landing-page.git

# Test connection
git remote -v

# Push ke GitLab
git add .
git commit -m "Complete SocialCrab landing page with admin dashboard and blog management"
git push -u origin main
```

## Alternative: Quick Setup Script

Setelah dapat token, ganti `YOUR_TOKEN_HERE` dengan token kamu:

```bash
#!/bin/bash
TOKEN="glpat-YOUR_TOKEN_HERE"

git config user.name "backend_socialcrab"
git config user.email "backend@socialcrab.id"
git remote remove origin 2>/dev/null || true
git remote add origin "https://backend_socialcrab:${TOKEN}@gitlab.com/socialcrab/sc-landing-page.git"
git add .
git commit -m "Complete SocialCrab landing page with admin dashboard

Features:
✅ Domain-Driven Design architecture
✅ Admin dashboard with JWT authentication
✅ Blog management with WYSIWYG editor  
✅ AWS S3 image upload integration
✅ MongoDB database integration
✅ Real blog data on landing page
✅ Fixed navigation dropdown
✅ SEO tools (robots.txt, sitemap.xml)

Tech Stack: React + Express + MongoDB + AWS S3
Admin: /admin/login (admin/admin123)
"
git push -u origin main
```

## Project Ready to Deploy

Current project status:
- ✅ **5 commits** dengan semua features
- ✅ **Admin Dashboard** - Blog management system
- ✅ **Database Integration** - 3 sample blog posts
- ✅ **AWS S3 Upload** - Image upload working
- ✅ **Landing Page** - Real data integration
- ✅ **Navigation** - Dropdown positioning fixed
- ✅ **SEO Ready** - Export tools implemented

**Repository siap untuk production!**