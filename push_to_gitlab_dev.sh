#!/bin/bash

# GitLab Push Script for DEV Branch
# SocialCrab Landing Page

echo "🚀 Starting GitLab push to dev branch..."

# Configure git user
echo "📝 Configuring git user..."
git config --global user.email "admin@socialcrab.id"
git config --global user.name "SocialCrab Admin"

# Remove lock files
echo "🔓 Removing git lock files..."
rm -f .git/config.lock .git/index.lock

# Add remote if it doesn't exist
echo "🔗 Setting up GitLab remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://glpat-VDc53fuVH-BxaF2m23@gitlab.com/socialcrab/sc-landing-page.git

# Create dev branch
echo "🌿 Creating dev branch..."
git checkout -b dev 2>/dev/null || git checkout dev

# Add and commit
echo "📦 Adding files and committing..."
git add .
git commit -m "Dev branch: SocialCrab landing page with Iconsax icons integration

- Complete Iconsax React icons integration across all pages
- Features page: Verify, Link21, TrendUp, Monitor, UserSearch, DocumentText
- Platform integrations: Facebook, Instagram, VideoPlay, MessageText1, Category, Youtube, Microphone2, Send2
- About page: People, MoneyRecive, Global, Verify for stats
- Company values: Verify, Eye, Lamp, ShieldSecurity
- Demo page: TickCircle for success state
- Admin navigation simplified without hardcoded SVG icons
- All designs consistent with Preline system
- Ready for production deployment"

# Push to GitLab
echo "⬆️ Pushing to GitLab dev branch..."
git push -u origin dev

echo "✅ Successfully pushed to GitLab dev branch!"
echo "🔗 Repository: https://gitlab.com/socialcrab/sc-landing-page.git"
echo "🌿 Branch: dev"