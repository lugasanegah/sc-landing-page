# GitLab SSH Setup Guide

## SSH Connection untuk Private Repository

Untuk connect ke `git@gitlab.com:socialcrab/sc-landing-page.git` menggunakan SSH, kamu perlu setup SSH key di local machine atau server deployment.

### Step 1: Generate SSH Key

Di terminal local machine atau server deployment kamu:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "backend@socialcrab.id"

# Akan prompt location, bisa default atau custom:
# Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/id_rsa_gitlab

# Enter passphrase (optional, bisa kosong untuk automation)
```

### Step 2: Add SSH Key to GitLab

1. Copy public key:
```bash
cat ~/.ssh/id_rsa.pub
# atau jika custom name:
cat ~/.ssh/id_rsa_gitlab.pub
```

2. Login ke GitLab → Settings → SSH Keys
3. Paste public key content
4. Add descriptive title: "SocialCrab Landing Page Server"
5. Click "Add key"

### Step 3: Test SSH Connection

```bash
# Test GitLab connection
ssh -T git@gitlab.com

# Expected output:
# Welcome to GitLab, @backend_socialcrab!
```

### Step 4: Setup Git Remote dengan SSH

```bash
# Configure git user (if not done)
git config user.name "backend_socialcrab"
git config user.email "backend@socialcrab.id"

# Remove existing remote (if any)
git remote remove origin

# Add SSH remote
git remote add origin git@gitlab.com:socialcrab/sc-landing-page.git

# Verify remote
git remote -v
```

### Step 5: Push to GitLab

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Complete SocialCrab landing page with admin dashboard

Features implemented:
✅ Domain-Driven Design architecture
✅ Admin dashboard with JWT authentication  
✅ Blog management system with CRUD operations
✅ React Quill WYSIWYG editor
✅ AWS S3 image upload integration
✅ MongoDB database integration
✅ Category-based blog filtering
✅ SEO tools (robots.txt, sitemap.xml)
✅ Real blog data integration on landing page
✅ Fixed navigation dropdown positioning
✅ Responsive Preline design system

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

# Push to GitLab
git push -u origin main
```

## Alternative: HTTPS dengan Personal Access Token

Jika SSH tidak bisa, gunakan Personal Access Token:

### Step 1: Create Personal Access Token

1. GitLab → Settings → Access Tokens
2. Token name: "SocialCrab Landing Page"
3. Select scopes: `read_repository`, `write_repository`
4. Create personal access token
5. Copy token (akan hilang setelah page di-refresh)

### Step 2: Use Token for Git Remote

```bash
# Remove existing remote
git remote remove origin

# Add HTTPS remote dengan token
git remote add origin https://backend_socialcrab:YOUR_PERSONAL_ACCESS_TOKEN@gitlab.com/socialcrab/sc-landing-page.git

# Push
git push -u origin main
```

## Current Project Status

Repository siap untuk di-push ke GitLab:

✅ **5 commits** dengan complete features
✅ **Admin Dashboard** - Complete CRUD blog management
✅ **WYSIWYG Editor** - React Quill dengan AWS S3 upload
✅ **Database Integration** - MongoDB dengan real data
✅ **Landing Page** - Responsive dengan real blog data
✅ **Navigation Fixed** - Dropdown positioning resolved
✅ **SEO Ready** - robots.txt dan sitemap.xml export
✅ **Authentication** - JWT cookie-based system

## Repository Structure

```
socialcrab-landing-page/
├── client/                 # React frontend
│   ├── src/domains/       # DDD architecture
│   │   ├── admin/         # Admin dashboard
│   │   ├── auth/          # Authentication
│   │   ├── blog/          # Blog frontend
│   │   ├── landing/       # Landing page
│   │   ├── pricing/       # Pricing section
│   │   └── shared/        # Shared components
├── server/                # Express backend
│   ├── controllers/       # API controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── middleware/       # Auth middleware
├── shared/               # Shared types
└── README.md
```

**Ready untuk production deployment!**